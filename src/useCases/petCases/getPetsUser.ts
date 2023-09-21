import { Request, Response } from 'express';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants';

//=====================================
//        READ LIST PETS = GET
//=====================================

export const getPetsUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        message: SOMETHING_IS_WRONG,
        error,
      });
    }
  }
};
