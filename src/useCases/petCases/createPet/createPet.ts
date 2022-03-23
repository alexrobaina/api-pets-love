import { Response, Request } from 'express';
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../../constants/constants';
import { save } from '../../../repositories/petRepository';

//=====================================
//           CREATE USER = POST
//=====================================

export const create = async (req: Request, res: Response) => {
  try {
    let images: Array<String> = [];
    // @ts-ignore
    if (req.imageUrl) {
      // @ts-ignore
      req.imageUrl.forEach((image: any) => {
        images.push(`${image.key}`);
      });
    }

    // @ts-ignore
    const pet = await save(req.body, req.user.userId, images);

    return res.status(201).json({
      ok: true,
      pet,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    if (error) {
      console.log(error);

      return res.status(500).json({
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      });
    }
  }
};
