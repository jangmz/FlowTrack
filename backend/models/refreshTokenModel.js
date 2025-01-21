import { PrismaClient } from "@prisma/client";
import { safeQuery } from "../utility/queryWrapper.js";

const prisma = new PrismaClient();

// insert new token
async function insertToken(token) {
    await safeQuery(() => 
        prisma.refreshToken.create({
            data: {
                token: token
            }
        })
    );
}

// delete token
async function deleteToken(token) {
    await safeQuery(() => 
        prisma.refreshToken.delete({
            where: {
                token: token
            }
        })
    );
}

export default {
    insertToken,
    deleteToken
}