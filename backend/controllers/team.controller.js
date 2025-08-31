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

export const joinTeam = async (req, res, next) => {
    try {

        const teamId = req.params.id;
        const user = req.user;

        if (!teamId) {
            const error = new Error('Team not found');
            error.statusCode = 404;
            throw error;
        } else {
            const team = await Team.findByIdAndUpdate(teamId, { $push: { members: [user._id] } });
            await User.findByIdAndUpdate(user._id, { $push: { teams: [team._id] } });

            res.status(201).json({
                message: 'Joined to the team',
                team
            })
        }

    } catch (error) {
        next(error);
    }
}

export const deleteTeam = async (req, res, next) => {
    try {
        const teamId = req.params.id;
        const user = req.user;

        const team = await Team.findById(teamId);

        if (user._id == team.admin) {
            await Team.deleteOne({ _id: teamId });
            // here it is only updated to current user, not all the user, should come up with logic
            // await User.findByIdAndUpdate(user._id, { $pull: { teams: teamId } });
            res.status(201).json({
                message: 'Team deleted',
            })
        } else {
            const error = new Error('Not an admin');
            error.statusCode = 404;
            throw error;
        }

    } catch (error) {
        next(error);
    }
}

export const exitTeam = async (req, res, next) => {
    try {

        const teamId = req.params.id;
        const user = req.user;

        await User.findByIdAndUpdate(user._id, { $pull: { teams: teamId } });
        await Team.findByIdAndUpdate(teamId, { $pull: { members: user._id } });

        res.status(201).json({
            message: "Exited from the team"
        })

    } catch (error) {
        next(error);
    }
}