import { Router } from "express";
import { createTask, updateTask, viewTaskAtPersonalPage, viewTaskAtTeamPage } from "../controllers/task.controller.js";
import authorizationMiddleware from "../middlewares/authorize.middleware.js";

const taskRouter = Router();

taskRouter.post('/create', authorizationMiddleware, createTask);
taskRouter.post('/update/:id', authorizationMiddleware, updateTask);
taskRouter.get('/view-task-in-team/:id', authorizationMiddleware, viewTaskAtTeamPage);
taskRouter.get('/view-task-in-profile', authorizationMiddleware, viewTaskAtPersonalPage);

export default taskRouter;