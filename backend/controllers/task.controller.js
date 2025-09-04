import { Team } from "../models/team.model.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createTask = async (req, res, next) => {
    try {
        const { title, description, dueDate, status, assignedTo, team } = req.body;
        const user = req.user;

        if (!title || !description || !dueDate || !status || !assignedTo || !team) {
            const error = new Error("Please fill all fields");
            error.statusCode = 404;
            throw error;
        }

        const teamData = await Team.findById(team).populate('admin');

        if (user._id.toString() !== teamData.admin._id.toString()) {

            const error = new Error('Not an admin');
            error.statusCode = 404;
            throw error;

        } else {

            if (teamData.members.includes(assignedTo)) {

                const task = await Task.create({ title, description, dueDate, status, assignedTo, team });
                await Team.findByIdAndUpdate(team, { $push: { tasks: [task._id] } });
                await User.findByIdAndUpdate(assignedTo, { $push: { tasks: [task._id] } });

                res.status(201).json({
                    message: "Task created",
                    task,
                })
            } else {
                const error = new Error("User not found!");
                error.statusCode = 404;
                throw error;
            }

        }
    } catch (error) {
        next(error)
    }
}