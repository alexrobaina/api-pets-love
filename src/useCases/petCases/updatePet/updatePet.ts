import { Response, Request } from 'express';
import Pet from '../../../database/models/pet';
import User from '../../../database/models/user';
import { NOT_FOUND_DOCUMENT, SUCCESS_RESPONSE } from '../../../constants/constants';

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

  if (body.vet) {
    const user = await User.findOne({ email: body.vet }, '_id');
    if (!user) {
      return res.status(401).json({
        ok: true,
        message: `${NOT_FOUND_DOCUMENT} from veterinary`,
      });
    }

    body.vet = user._id;
  }

  body.updatedDate = new Date();
  const petUpdated = await Pet.findByIdAndUpdate({ _id }, body);

  res.status(200).json({
    ok: true,
    petUpdated,
    message: SUCCESS_RESPONSE,
  });
};
