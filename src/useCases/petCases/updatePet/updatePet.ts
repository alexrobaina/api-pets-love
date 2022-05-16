import { Response, Request } from 'express';
import Pet from '../../../database/models/pet';
import { NOT_FOUND_DOCUMENT, SUCCESS_RESPONSE } from '../../../constants/constants';
import awsDeleteImage from '../../../middlewares/awsDeleteImage';

//=====================================
//       UPDATE USER ID = PUT
//=====================================

export const update = async (req: Request, res: Response) => {
  const { _id } = req.query;
  const { body } = req;
  const medicalNoteIsString = typeof body.medicalNotes === 'string';
  let medicalNote: any = [];
  let medicalNotesFormatter: any = [];
  if (medicalNoteIsString) {
    // @ts-ignore
    medicalNotesFormatter = [JSON.parse(body.medicalNotes)];
  }
  // @ts-ignore
  if (medicalNotesFormatter || medicalNoteIsString) {
    medicalNotesFormatter.forEach((note: any) => {
      // @ts-ignore
      medicalNote.push(note);
    });
  }

  body.location = JSON.parse(body.location);

  // @ts-ignore
  body.medicalNotes = medicalNote;

  // @ts-ignore
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

  if (body.userVet === 'null') {
    body.userVet = null;
  }

  if (body.userAdopted === 'null') {
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
