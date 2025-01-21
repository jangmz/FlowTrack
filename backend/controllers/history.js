import db from "../models/historyModel.js";
import { parseISO } from "date-fns";

// GET /api/history -> returns all history data
async function getHistory(req, res, next) {
    try {
        const history = await db.getAllHistoryData();
        res.json(history);
    } catch (error) {
        next(error);
    }
}

// POST /api/history -> adds new data into history
async function insertHistory(req, res, next) {
    const newHistoryData = req.body;

    newHistoryData.deviceId = parseInt(newHistoryData.deviceId);
    newHistoryData.userId = parseInt(newHistoryData.userId);

    // parse dates
    newHistoryData.rentDate = parseISO(newHistoryData.rentDate);
    newHistoryData.returnDate = parseISO(newHistoryData.returnDate);

    console.log("Saving new history data: ", newHistoryData);

    try {
        const insertedHistoryData = await db.insertHistoryData(newHistoryData);
        res.json({ message: "New record archived.", data: insertedHistoryData });
    } catch (error) {
        next(error);
    }
}

// DELETE /api/history/:historyId -> deletes history data by ID
async function deleteHistory(req, res, next) {
    const historyId = parseInt(req.params.historyId);

    console.log(`Deleting history entry with ID: ${historyId}`);

    try {
        const deletedData = await db.deleteHistoryData(historyId);
        res.json({ message: "Entry deleted.", data: deletedData });
    } catch (error) {
        next(error);
    }
}

export default {
    getHistory,
    insertHistory,
    deleteHistory
}