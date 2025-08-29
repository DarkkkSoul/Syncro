import Router from "express";
import { signupController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', signupController)

export default authRouter;