import db from "../models/userModel.js";

// GET /api/users -> returns all users in the database
async function getUsers(req, res) {
    try {
        const allUsers = await db.getAllUsers();
        res.json(allUsers);
    } catch (error) {
        next(error);
    }
}

// POST /api/users -> creates new user in the DB
async function insertUser(req, res, next) {
    const newUser = req.body;

    console.log("Saving new user: ", newUser);

    try {
        const user = await db.createUser(newUser);
        res.json({ message: "User saved to database.", data: user });
    } catch (error) {
        next(error);
    }
}

// DELETE /api/users/:userId
async function deleteUser(req, res, next){
    const userId = parseInt(req.params.userId);

    console.log(`Deleting user with ID: ${userId}`);

    try {
        const deletedUser = await db.deleteUser(userId);
        res.json({ message: "User deleted from database.", data: deletedUser });
    } catch (error) {
        next(error);
    }
}

// PUT /api/users/:userId
async function updateUser(req, res, next) {
    const updatedUser = req.body;
    updatedUser.id = parseInt(req.params.userId);

    console.log(`Updating user data with ID: ${updatedUser.id}`);

    try {
        const user = await db.editUserData(updatedUser);
        res.json({ message: "User data has been updated.", data: user });
    } catch (error) {
        next(error);
    }
}

export default {
    getUsers,
    insertUser,
    deleteUser,
    updateUser,
}