import db from "../models/deviceModel.js";
import csv from "csv-parser";
import fs from "fs";
import { format } from "fast-csv";
import path from "path";
import { fileURLToPath } from "url";

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
    
    if (updatedDevice.inventoryNumber) {
        updatedDevice.inventoryNumber = parseInt(updatedDevice.inventoryNumber);
    }

    updatedDevice.clientId 
        ? updatedDevice.clientId = parseInt(updatedDevice.clientId)
        : null;

    console.log("Updating device data: ", updatedDevice);

    try {
        const device = await db.updateDevice(updatedDevice);
        res.json({ message: "Device data has been updated.", data: device });
    } catch (error) {
        next(error);
    }
}

// POST /api/devices/import
async function importDevices(req, res, next) {
    const results = [];
    const filePath = req.file.path;
    let rowsInserted = 0;

    // open stream to read file and collect rows in results array
    console.log("Reading file...");
    try {
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", row => {
                    row.inventoryNumber = parseInt(row.inventoryNumber); // parse inventoryNumber to integers
                    //console.log(row); // data is ok
                    results.push(row);
                })
                .on("end", resolve)
                .on("error", reject);
        });
    } catch (error) {
        fs.unlinkSync(filePath);
        next(error);
    }

    console.log("Inserting data into DB...");

    try {
        // insert rows into DB
        await Promise.all(results.map(async row => {
            console.log("Row to be inserted:")
            console.log(row);
            await db.createDevice(row);
            rowsInserted++;
        }));

        // delete file after processing
        fs.unlinkSync(filePath);

        console.log(`Finished. ${rowsInserted} rows inserted.`);
        res.json({ message: "Data has been imported successfully." });
    } catch (error) {
        fs.unlinkSync(filePath);
        next(error);
    }
}

// GET /api/devices/export
async function exportDevices(req, res, next) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
        // fetch devices from DB
        const allDevices = await db.getAllDevices();

        if (!allDevices.length) {
            throw new Error ("No devices found in the database.");
        }

        // create folder & define file path
        const exportsDir = path.join(__dirname, "../exports");
        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }
        const filePath = path.join(__dirname, "../exports/devices.csv");
        const ws = fs.createWriteStream(filePath);

        // write CSV data
        const csvStream = format({ headers: true });
        csvStream.pipe(ws);
        allDevices.forEach((device) => csvStream.write(device));
        csvStream.end();

        ws.on("finish", () => {
            res.download(filePath, "devices.csv", (err) => {
                if (err) next(err);
                fs.unlinkSync(filePath); // delete file after download
            });
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getAllDevices,
    insertDevice,
    deleteDevice,
    updateDevice,
    importDevices,
    exportDevices
}