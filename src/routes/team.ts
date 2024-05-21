import express from 'express'
import * as teamController from '../useCases/teamCase/team.controller'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.post('/teams/', verifyToken, teamController.createTeam)
router.get('/teams/:id', verifyToken, teamController.getTeamById)
router.put('/teams/:id', verifyToken, teamController.updateTeam)
router.delete('/teams/:id', verifyToken, teamController.deleteTeam)
router.get('/teams/', verifyToken, teamController.listTeams)

router.get('/teamsByUser/', verifyToken, teamController.listTeamsByUser)

// Routes for managing team members
router.post('/teams/:id/members', verifyToken, teamController.addMember)
router.delete(
  '/teams/:id/members/:userId',
  verifyToken,
  teamController.removeMember,
)

// Route to check if user is a member of the pet creator's team
router.get(
  '/teams/pet/:petId/membership/:userId',
  teamController.checkUserMembership,
)

export default router
