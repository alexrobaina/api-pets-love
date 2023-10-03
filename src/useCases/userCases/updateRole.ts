import { Request, Response } from 'express';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants';
import { prisma } from '../../database/prisma';

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.body;
  const userToken: { id?: string } = req.user || '';

  if (id !== userToken.id) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }
  console.log(req.body);

  try {
    const user = await prisma.user.update({
      where: { id },
      data: req.body,
    });

    return res.status(200).json({ user, ok: true, message: SUCCESS_RESPONSE });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: SOMETHING_IS_WRONG, error });
  }
};
