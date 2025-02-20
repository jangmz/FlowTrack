import dbClientModel from "../models/clientModel.js";
import csv from "csv-parser";
import fs from "fs";
import { format } from "fast-csv";
import path from "path";
import { fileURLToPath } from "url";

// GET /api/clients -> returns all clients
async function getClients(req, res, next) {
    try {
        const allClients = await dbClientModel.getAllClients();
        res.json(allClients);
    } catch (error) {
        next(error);
    }
}

// POST /api/clients -> inserts a client
async function postClient(req, res, next) {
    const newClient = req.body;
    console.log("Saving new client...");

    try {
        const client = await dbClientModel.createNewClient(newClient);
        console.log("Client saved.");
        res.json({ message: "Client saved to database.", data: client });
    } catch (error) {
        next(error);
    }
}

// PUT /api/clients/:clientId -> updates client data
async function putClient(req, res, next) {
    const clientId = parseInt(req.params.clientId);
    const clientData = req.body;
    clientData.id = clientId;

    console.log("Updating client data...");

    try {
        const client = await dbClientModel.updateClient(clientData);
        console.log("Client updated.");
        res.json({ message: "Client data has been updated.", data: client });
    } catch (error) {
        next(error);
    }
}

// DELETE /api/clients/:clientId -> deletes a client
async function deleteClient(req, res, next) {
    const clientId = parseInt(req.params.clientId);
    
    console.log("Deleting client with ID:", clientId);

    try {
        const deletedClient = await dbClientModel.deleteClient(clientId);
        console.log("Client removed.");
        res.json({ message: "Client removed from the database.", data: deletedClient });
    } catch (error) {
        next(error);
    }
}

// POST /api/clients/import -> imports clients data from CSV file
async function importClients(req, res, next) {
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
                    //console.log(row); // data is ok
                    results.push(row);
                })
                .on("end", resolve)
                .on("error", reject);
        });
    } catch (error) {
        next(error);
    }

    console.log("Inserting data into DB...");

    try {
        // insert rows into DB
        await Promise.all(results.map(async row => {
            //console.log("Row to be inserted:")
            //console.log(row);
            await dbClientModel.createNewClient(row);
            rowsInserted++;
        }));

        // delete file after processing
        fs.unlinkSync(filePath);

        console.log(`Finished. ${rowsInserted} rows inserted.`);
        res.json({ message: "Data has been imported successfully." });
    } catch (error) {
        next(error);
    }
}

// GET /api/clients/export -> exports all clients data to CSV file
async function exportClients(req, res, next) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
        // fetch devices from DB
        const allClients = await dbClientModel.getAllClients();

        if (!allClients.length) {
            throw new Error ("No clients found in the database.");
        }

        // create folder & define file path
        const exportsDir = path.join(__dirname, "../exports");
        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }
        const filePath = path.join(__dirname, "../exports/clients.csv");
        const ws = fs.createWriteStream(filePath);

        // write CSV data
        const csvStream = format({ headers: true });
        csvStream.pipe(ws);
        allClients.forEach((client) => csvStream.write(client));
        csvStream.end();

        ws.on("finish", () => {
            res.download(filePath, "clients.csv", (err) => {
                if (err) next(err);
                fs.unlinkSync(filePath); // delete file after download
            });
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getClients,
    postClient,
    putClient,
    deleteClient,
    importClients,
    exportClients,
}