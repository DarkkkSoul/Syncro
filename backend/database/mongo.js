import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const connectToDB = async (req, res, next) => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('*** Connected to DB! ***');
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
}

export default connectToDB;