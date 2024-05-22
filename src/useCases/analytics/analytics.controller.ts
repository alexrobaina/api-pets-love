import { Request, Response } from 'express'
import * as getPetAnalytics from './service/analytics.service'

export const getAnalytics = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const analytics = await getPetAnalytics.getPetAnalytics(userId as string)
    res.status(200).json(analytics)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}
