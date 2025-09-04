import { Router } from "express";
import { createTask } from "../controllers/task.controller.js";
import authorizationMiddleware from "../middlewares/authorize.middleware.js";

const taskRouter = Router();

taskRouter.post('/create', authorizationMiddleware, createTask);

export default taskRouter;