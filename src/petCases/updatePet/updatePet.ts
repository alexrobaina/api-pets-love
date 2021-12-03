import { Response, Request } from 'express';
import Pet from '../../database/models/pet';
import { NOT_FOUND_DOCUMENT, SUCCESS_RESPONSE } from '../../constants/constants';

//=====================================
//       UPDATE USER ID = PUT
//=====================================

export const update = async (req: Request, res: Response) => {
  const { _id } = req.query;
  const { body } = req;

  const pet = await Pet.findOne({ _id });

  if (!pet) {
    return res.status(401).json({
      ok: true,
      message: NOT_FOUND_DOCUMENT,
    });
  }

  body.updatedDate = new Date();
  const petUpdated = await Pet.findByIdAndUpdate({ _id }, body);

  res.status(200).json({
    ok: true,
    petUpdated,
    message: SUCCESS_RESPONSE,
  });
};
