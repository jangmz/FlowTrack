import { PrismaClient } from "@prisma/client";
import { safeQuery } from "../utility/queryWrapper.js";

const prisma = new PrismaClient();

// create new device
async function createDevice(device) {
    return await safeQuery(() => 
        prisma.device.create({
            data: {
                deviceType: device.deviceType,
                model: device.model,
                serialNumber: device.serialNumber,
                inventoryNumber: device.inventoryNumber,
                status: device.status,
            },
        })
    );
}

// delete device (by ID)
async function deleteDeviceById(deviceId) {
    return await safeQuery(() => 
        prisma.device.delete({
            where: {
                id: deviceId
            }
        })
    );
}

// update device with new data
async function updateDevice(device) {
    return await safeQuery(() => 
        prisma.device.update({
            where: {
                id: device.id,
            },
            data: {
                deviceType: device.deviceType,
                model: device.model,
                serialNumber: device.serialNumber,
                inventoryNumber: device.inventoryNumber,
                status: device.status,
            }
        })
    );
}

// read all devices ordered by inventory number
async function getAllDevices() {
    return await safeQuery(() =>
        prisma.device.findMany({
            orderBy: [
                {
                    inventoryNumber: "asc"
                }
            ]
        })
    )
}

// read all devices + their history (with user full names)
async function getAllDevicesWithHistory() {
    return await safeQuery(() =>
        prisma.device.findMany({
            include: {
                history: {
                    select: {
                        rentDate: true,
                        returnDate: true,
                    },
                    include: {
                        user: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                }
            }
        })
    )
}

export default {
    createDevice,
    deleteDeviceById,
    updateDevice,
    getAllDevices,
    getAllDevicesWithHistory,
}