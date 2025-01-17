import db from "../models/deviceModel.js";

// GET /api/devices -> returns all devices in DB
async function getAllDevices(req, res, next) {
    try {
        const allDevices = await db.getAllDevices();
        res.json(allDevices);
    } catch (error) {
        next(error);
    }
}

// POST /api/devices/ -> add new device to DB
async function insertDevice(req, res, next) {
    const newDevice = req.body;
    newDevice.inventoryNumber = parseInt(newDevice.inventoryNumber);

    console.log("Saving new device: ", newDevice);

    try {
        const device = await db.createDevice(newDevice);
        res.json({ message: "Device saved to database.", data: device });
    } catch (error) {
        next(error);
    }
}

// DELETE /api/devices/:deviceId -> deletes a device from DB
async function deleteDevice(req, res, next) {
    const deviceId = parseInt(req.params.deviceId);

    console.log(`Deleting device with ID: ${deviceId}`);

    try {
        const deletedDevice = await db.deleteDeviceById(deviceId);
        res.json({ message: "Device deleted from the database.", data: deletedDevice });
    } catch (error) {
        next(error);
    }
}

// PUT /api/devices/:deviceId -> updates device data in DB
async function updateDevice(req, res, next) {
    const updatedDevice = req.body;

    updatedDevice.id = parseInt(req.params.deviceId);
    updatedDevice.inventoryNumber = parseInt(updatedDevice.inventoryNumber);

    console.log("Updating device data: ", updatedDevice);

    try {
        const device = await db.updateDevice(updatedDevice);
        res.json({ message: "Device data has been updated.", data: device });
    } catch (error) {
        next(error);
    }
}

export default {
    getAllDevices,
    insertDevice,
    deleteDevice,
    updateDevice,
}