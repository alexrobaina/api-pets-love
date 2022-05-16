import { Response, Request } from 'express';
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../../constants/constants';
import { USER_ADOPTER_ROLE, USER_VET_ROLE } from '../../../database/models/constants/roles';
import { save } from '../../../repositories/petRepository';

//=====================================
//           CREATE USER = POST
//=====================================

export const create = async (req: Request, res: Response) => {
  try {
    let images: Array<String> = [];
    let medicalNotesFormatter: any = [];
    const roles = [USER_ADOPTER_ROLE, USER_VET_ROLE];
    // @ts-ignore
    const userRole = req.user.role;

    // @ts-ignore
    if (userRole === USER_ADOPTER_ROLE) {
      // @ts-ignore
      req.body.userAdopted = req.user?._id;
      req.body.adopted = true;
    }
    if (userRole === USER_VET_ROLE) {
      // @ts-ignore
      req.body.adopted = true;
      // @ts-ignore
      req.body.userVet = req.user?._id;
    }

    // @ts-ignore
    if (req?.imageUrl) {
      // @ts-ignore
      req.imageUrl.forEach((image: any) => {
        images.push(`${image.key}`);
      });
    }

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
