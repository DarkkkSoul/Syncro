import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const signupController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            const error = new Error("Fields not provided");
            error.statusCode = 404;
            throw error;
        }

        const user = await User.findOne({ email });

        if (user) {
            const error = new Error('User already exists');
            error.statusCode = 404;
            throw error;
        } else {

            const hashedPassword = await bcrypt.hash(password, 10);

            const users = await User.create([{ username, email, password: hashedPassword }]);

            const token = jwt.sign({ data: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

            res.status(200).json({
                message: 'User Created',
                token,
                userData: users[0]
            })
        }

    } catch (error) {
        next(error);
    }
}