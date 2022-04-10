import { Response, Request } from 'express';
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../../constants/constants';
import Pet from '../../../database/models/pet';
import { save } from '../../../repositories/petRepository';

//=====================================
//           CREATE USER = POST
//=====================================

export const create = async (req: Request, res: Response) => {
  try {
    let images: Array<String> = [];
    // @ts-ignore
    if (req?.imageUrl) {
      // @ts-ignore
      req.imageUrl.forEach((image: any) => {
        images.push(`${image.key}`);
      });
    }

    let medicalNotesFormatter: any = [];
    // @ts-ignore
    if (typeof req?.body?.medicalNotes === 'string') {
      // @ts-ignore
      medicalNotesFormatter = JSON.parse(req.body.medicalNotes);
    } else if (req?.body?.medicalNotes) {
      // @ts-ignore
      req.body.medicalNotes.forEach((note: any) => {
        // @ts-ignore
        medicalNotesFormatter.push(JSON.parse(note));
      });
    }

    req.body.location = JSON.parse(req.body.location);

    // @ts-ignore
    req.body.medicalNotes = medicalNotesFormatter;

    const pet = await save(req.body, images);

    res.status(201).json({
      ok: true,
      pet,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      });
    }
  }
};
