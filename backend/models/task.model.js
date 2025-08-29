import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: { type: String, enum: ["pending", "in-progress", "done"], default: "pending" },
    assignedTo: { type: String, required: true },
    team: { type: String, required: true },
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);