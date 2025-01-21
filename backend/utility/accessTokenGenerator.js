import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30min" });
    return accessToken;
}