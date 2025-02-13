import { PrismaClient } from "@prisma/client";
import { safeQuery } from "../utility/queryWrapper.js";

const prisma = new PrismaClient();

// returns all clients
async function getAllClients() {
    return await safeQuery(() =>
        prisma.client.findMany({
            orderBy: [
                {
                    fullName: "asc"
                }
            ]
        })
    );
}

// creates new client
async function createNewClient(client) {
    return await safeQuery(() => 
        prisma.client.create({
            data: {
                fullName: client.fullName,
                email: client.email
            }
        })
    );
}

// update client data
async function updateClient(client) {
    return await safeQuery(() => 
        prisma.client.update({
            where: {
                id: client.id
            },
            data: {
                fullName: client.fullName,
                email: client.email
            }
        })    
    );
}

// delete a client by ID
async function deleteClient(clientId) {
    return await safeQuery(() => 
        prisma.client.delete({
            where: {
                id: clientId
            }
        })
    );
}

export default {
    getAllClients,
    createNewClient,
    updateClient,
    deleteClient,
}