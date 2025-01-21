import { PrismaClient } from "@prisma/client";
import { safeQuery } from "../utility/queryWrapper.js";

const prisma = new PrismaClient();

// create new insert into history
async function insertHistoryData(historyData) {
    return await safeQuery(() =>
        prisma.history.create({
            data: {
                deviceId: historyData.deviceId,
                userId: historyData.userId,
                rentDate: historyData.rentDate,
                returnDate: historyData.returnDate
            }
        })
    );
}

// get all history
async function getAllHistoryData() {
    return await safeQuery(() =>
        prisma.history.findMany({
            include: {
                user: {
                    select: {
                        fullName: true,
                        email: true,
                        username: true,
                    }
                },
                device: {
                    select: {
                        inventoryNumber: true,
                        deviceType: true,
                        model: true,
                    }
                }
            }
        })
    );
}

// delete a row in history
async function deleteHistoryData(historyId) {
    return await safeQuery(() =>
        prisma.history.delete({
            where: {
                id: historyId
            }
        })
    );
}

export default {
    insertHistoryData,
    getAllHistoryData,
    deleteHistoryData
}