import dbClientModel from "../models/clientModel.js";

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

export default {
    getClients,
    postClient,
    putClient,
    deleteClient,
}