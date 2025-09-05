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

export const updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const user = req.user;

        const task = await Task.findById(taskId);

        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        if (user._id.toString() !== task.assignedTo.toString()) {
            const error = new Error('Not an assigned user');
            error.statusCode = 404;
            throw error;
        } else {
            const updatedTask = await Task.findByIdAndUpdate(taskId, req.body);
            res.status(201).json({
                message: 'Task updated',
                updatedTask
            })
        }
    } catch (error) {
        next(error)
    }
}

export const viewTaskAtTeamPage = async (req, res, next) => {
    try {
        const teamId = req.params.id;
        const team = await Team.findById(teamId);

        if (!team) {
            const error = new Error('Team not found');
            error.statusCode = 404;
            throw error;
        } else {
            res.status(201).json({
                message: 'Team tasks loaded',
                tasks: team.tasks
            })
        }
    } catch (error) {
        next(error)
    }
}

export const viewTaskAtPersonalPage = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            const error = new Error('Please Login');
            error.statusCode = 404;
            throw error;
        } else {
            res.status(201).json({
                message: 'User tasks loaded',
                tasks: user.tasks
            })
        }
    } catch (error) {
        next(error)
    }
}