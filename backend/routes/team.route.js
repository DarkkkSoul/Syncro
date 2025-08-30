import { Router } from 'express'
import { createTeam } from '../controllers/team.controller.js'
import authorizationMiddleware from '../middlewares/authorize.middleware.js';

const teamRouter = Router();

teamRouter.post('/create', authorizationMiddleware, createTeam);

export default teamRouter;
