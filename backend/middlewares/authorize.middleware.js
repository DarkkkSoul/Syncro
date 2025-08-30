import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { User } from "../models/user.model.js";

dotenv.config();


const authorizationMiddleware = async (req, res, next) => {
    try {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            const error = new Error('Unauthorized - please log in');
            error.statusCode = 401;
            throw error;
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: decodedToken.data });

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        req.user = user;

        next();

    } catch (error) {
        next(error);
    }
}

export default authorizationMiddleware;