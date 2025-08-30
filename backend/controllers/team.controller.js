import { Team } from "../models/team.model.js";
import { User } from "../models/user.model.js"

export const createTeam = async (req, res, next) => {
    try {

        const { teamName, description } = req.body;
        const user = req.user;

        if (!teamName || !description) {
            const error = new Error("Please fill all fields");
            error.statusCode = 404;
            throw error;
        }

        const team = await Team.findOne({ teamName });

        if (team) {
            const error = new Error("Team name already exists");
            error.statusCode = 404;
            throw error;
        } else {

            const team = await Team.create({ teamName, admin: user._id, description, members: [user._id] });

            await User.findByIdAndUpdate(user._id, { $push: { teams: [team._id] } });

            res.status(201).json({
                message: "Team created",
                team,
            })
        }

    } catch (error) {
        next(error);
    }
}