import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    admin: { type: String, required: true },
    description: { type: String },
    members: { type: Array, required: true },
}, { timestamps: true });

export const Team = mongoose.model('Team', teamSchema);