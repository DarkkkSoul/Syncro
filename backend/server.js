import express from 'express'
import dotenv from 'dotenv'
import errorHandler from './middlewares/errorHandler.middleware.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import connectToDB from './database/mongo.js';
import teamRouter from './routes/team.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/team', teamRouter)


app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Welcome to the backend of Syncro!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectToDB();
});