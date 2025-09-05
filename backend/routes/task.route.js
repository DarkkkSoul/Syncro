import { Router } from "express";
import { createTask, updateTask } from "../controllers/task.controller.js";
import authorizationMiddleware from "../middlewares/authorize.middleware.js";

const taskRouter = Router();

taskRouter.post('/create', authorizationMiddleware, createTask);
taskRouter.post('/update/:id', authorizationMiddleware, updateTask);

export default taskRouter;