import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";

export function adminAuthorization(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    // check if Authorization header exists
    if (typeof bearerHeader === "undefined") {
        console.log("Authorization header is missing.");
        return res.status(401).json({ message: "Forbidden access. Authorization header missing." });
    }

    // extract token and insert it into the request
    const bearer = bearerHeader.split(" ");
    req.token = bearer[1];

    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ message: "Forbidden access, please contact administrator." });
        }

        req.user = decodedUser;

        // limit to only admin access
        if (req.user.role === "admin"){
            next()
        } else {
            return res.status(403).json({ message: "Forbidden access. You need to be an administrator." });
        }
    })
}