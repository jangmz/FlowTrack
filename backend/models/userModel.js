import { PrismaClient } from "@prisma/client";
import { safeQuery } from "../utility/queryWrapper.js";

const prisma = new PrismaClient();

// create new user
async function createUser(user) {
    await safeQuery(() => 
        prisma.user.create({
            data: {
                fullName: user.fullName,
                role: user.role,
                username: user.username,
                password: user.password,
                email: user.email,
            }
        })
    );
}

// return all users
async function getAllUsers() {
    return await safeQuery(() =>
        prisma.user.findMany({
            orderBy: [
                {
                    fullName: "asc"
                }
            ]
        })
    );
}

// return user from username
async function getUserByUsername(username) {
    return await safeQuery(() => 
        prisma.user.findUnique({
            where: {
                username: username
            }
        })
    );
}

// return user from email
async function getUserByEmail(email) {
    return await safeQuery(() => 
        prisma.user.findUnique({
            where: {
                email: email
            }
        })
    );
}

// delete user
async function deleteUser(userId) {
    return await safeQuery(() =>
        prisma.user.delete({
            where: {
                id: userId
            }
        })
    );
}

// update user data
async function editUserData(user) {
    return await safeQuery(() =>
        prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                fullName: user.fullName,
                role: user.role,
                username: user.username,
                email: user.email,
            }
        })
    );
}

export default {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUserByEmail,
    deleteUser,
    editUserData,
}   