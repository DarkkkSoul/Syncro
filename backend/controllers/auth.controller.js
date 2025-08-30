import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const signupController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            const error = new Error("Please fill all fields");
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

            const token = jwt.sign({ data: email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

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

export const signinController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error("Please fill all fields");
            error.statusCode = 404;
            throw error;
        }

        const user = await User.findOne({ email });

        if (!user) {

            const error = new Error('User doesnot exist');
            error.statusCode = 404;
            throw error;

        } else {

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                const error = new Error('Incorrect Password');
                error.statusCode = 404;
                throw error;
            }

            const token = jwt.sign({ data: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

            res.status(200).json({
                message: 'User signed in',
                token,
                userData: user
            })
        }

    } catch (error) {
        next(error);
    }
}