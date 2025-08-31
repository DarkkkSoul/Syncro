import { Router } from 'express'
import { createTeam, deleteTeam, exitTeam, joinTeam } from '../controllers/team.controller.js'
import authorizationMiddleware from '../middlewares/authorize.middleware.js';

const teamRouter = Router();

teamRouter.post('/create', authorizationMiddleware, createTeam);
teamRouter.post('/join/:id', authorizationMiddleware, joinTeam);
teamRouter.post('/delete/:id', authorizationMiddleware, deleteTeam);
teamRouter.post('/exit/:id', authorizationMiddleware, exitTeam);

export default teamRouter;