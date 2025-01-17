export async function safeQuery(fn) {
    try {
        return await fn();
    } catch (error) {
        console.error("Database error: ", error);

        // handle unique specific prisma errors
        if (error.code === "P2002") {
            throw new Error("Unique constraint violation");
        }

        throw new Error("Database query failed");
    }
}