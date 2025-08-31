import { Router } from 'express'
import { createTeam, deleteTeam, exitTeam, infoTeam, joinTeam, listTeam, membersTeam } from '../controllers/team.controller.js'
import authorizationMiddleware from '../middlewares/authorize.middleware.js';

const teamRouter = Router();

teamRouter.post('/create', authorizationMiddleware, createTeam);
teamRouter.post('/delete/:id', authorizationMiddleware, deleteTeam);
teamRouter.post('/join/:id', authorizationMiddleware, joinTeam);
teamRouter.get('/members/:id', authorizationMiddleware, membersTeam);

teamRouter.post('/exit/:id', authorizationMiddleware, exitTeam);
teamRouter.get('/list', authorizationMiddleware, listTeam);
teamRouter.get('/info/:id', authorizationMiddleware, infoTeam);

export default teamRouter;