import { Response, Request } from 'express';
import Pet from '../../../database/models/pet';
import User from '../../../database/models/user';
import { NOT_FOUND_DOCUMENT, SUCCESS_RESPONSE } from '../../../constants/constants';
import awsDeleteImage from '../../../middlewares/awsDeleteImage';

//=====================================
//       UPDATE USER ID = PUT
//=====================================

export const update = async (req: Request, res: Response) => {
  const { _id } = req.query;
  const { body } = req;

  const pet = await Pet.findOne({ _id });
  if (body.imageDeleted) {
    const imagesDeletedFormatted = Array.from(body.imageDeleted);
    // @ts-ignore
    await awsDeleteImage(body.imageDeleted, 'pets');
    // @ts-ignore
    const petImages = Array.from(pet.images);

    var filtered = petImages.filter(function (e) {
      // @ts-ignore
      return this.indexOf(e) < 0;
    }, imagesDeletedFormatted);

    body.images = filtered;
  }

  if (!pet) {
    return res.status(404).json({
      ok: true,
      message: NOT_FOUND_DOCUMENT,
    });
  }

  // @ts-ignore
  if (req?.imageUrl) {
    // @ts-ignore
    if (!body.images) {
      body.images = [];
    }
    // @ts-ignore
    req.imageUrl.forEach((image: any) => {
      body.images.push(image.key);
    });
  }

  if (body.userVet !== 'null') {
    const user = await User.findOne({ email: body.userVet }, '_id');
    if (!user) {
      return res.status(404).json({
        ok: true,
        message: `${NOT_FOUND_DOCUMENT} from update pet`,
      });
    }

    body.userVet = user._id;
  } else {
    body.userVet = null;
  }

  if (body.userAdopted !== 'null') {
    const user = await User.findOne({ email: body.userAdopted }, '_id');
    if (!user) {
      return res.status(404).json({
        ok: true,
        message: `${NOT_FOUND_DOCUMENT} from update pet`,
      });
    }

    body.userAdopted = user._id;
  } else {
    body.userAdopted = null;
  }

  body.updatedDate = new Date();
  const petUpdated = await Pet.findByIdAndUpdate({ _id }, body);

  res.status(200).json({
    ok: true,
    petUpdated,
    message: SUCCESS_RESPONSE,
  });
};
