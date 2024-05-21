import { Request, Response } from 'express'
import * as teamService from './services/team.service'

export const createTeam = async (req: any, res: Response) => {
  const createdBy = req?.user?.id as string
  try {
    const team = await teamService.createTeam(req.body, createdBy)
    res.status(201).json(team)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const team = await teamService.updateTeam(id, req.body)
    res.status(200).json(team)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const team = await teamService.deleteTeam(id)
    res.status(200).json(team)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const team = await teamService.getTeamById(id)
    res.status(200).json(team)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const listTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await teamService.listTeams()
    res.status(200).json(teams)
  } catch (error: any) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

export const listTeamsByUser = async (req: any, res: Response) => {
  const userId: string = req.user?.id // Assuming the user ID is available in req.user

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const teams = await teamService.listTeamsByUser(userId)
    res.status(200).json(teams)
  } catch (error: any) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

export const addMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { userId, role } = req.body
    const teamMembership = await teamService.addMember(id, userId, role)
    res.status(201).json(teamMembership)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const removeMember = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params
    await teamService.removeMember(id, userId)
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const checkUserMembership = async (req: Request, res: Response) => {
  try {
    const { petId, userId } = req.params

    if (!userId) {
      return res.status(200).json({ isMember: false })
    }

    const isMember = await teamService.isUserMemberOfPetCreatorTeam(
      userId,
      petId,
    )
    res.status(200).json({ isMember })
  } catch (error: any) {
    console.log(error)

    res.status(400).json({ error: error.message })
  }
}
