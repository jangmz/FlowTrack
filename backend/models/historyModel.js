import { PrismaClient } from "@prisma/client";
import { safeQuery } from "../utility/queryWrapper.js";

const prisma = new PrismaClient();

// create new insert into history
async function insertHistoryData(historyData) {
    return await safeQuery(() =>
        prisma.history.create({
            data: {
                rentDate: historyData.rentDate,
                device: {
                    connect: { id: historyData.device.id }
                },
                client : historyData.client 
                    ? { connect: { id: historyData.client.id } }
                    : undefined
                //returnDate: historyData.returnDate
            }
        })
    );
}

// get all history
async function getAllHistoryData() {
    return await safeQuery(() =>
        prisma.history.findMany({
            include: {
                client: {
                    select: {
                        fullName: true,
                        email: true
                    }
                },
                device: {
                    select: {
                        inventoryNumber: true,
                        deviceType: true,
                        model: true,
                        status: true
                    }
                }                
            },
            orderBy: [
                {
                    rentDate: "desc"
                }
            ]
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