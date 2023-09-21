import { Response, Request } from 'express';
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants';
import { prisma } from '../../database/prisma';

//=====================================
//            GET PRODUCTOS
//=====================================

export const getProduct = async (_req: Request, res: Response) => {
  try {
    const product = await prisma.product.findMany({});

    res.status(200).json({
      ok: true,
      product,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    if (error) {
      console.log(error);

      return res.status(500).json({
        code: 4,
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      });
    }
  }
};
