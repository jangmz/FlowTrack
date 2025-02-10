import dbUser from "../models/userModel.js";
import dbRefToken from "../models/refreshTokenModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { generateAccessToken } from "../utility/accessTokenGenerator.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

// POST /auth/sign-up -> user sign up (save user to db)
async function signUp(req, res, next) {
    
    // check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        console.log(validationErrors);
        return res.status(400).json({ errors: validationErrors.array() });
    }

    const user = req.body;

    try {
        // password encryption
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password1, saltRounds);
        delete user.password1;
        delete user.password2;

        // save to DB
        await dbUser.createUser(user);
        res.json({ message: "User created successfully." });
    } catch (error) {
        next(error);
    }
}

// POST /auth/log-in -> check user authentication, create access and refresh tokens, send them to FE
async function logIn(req, res, next) {
    const { username, password } = req.body;

    try {
        // check for username in DB
        const user = await dbUser.getUserByUsername(username);
        if (!user) {
            throw new Error("User does not exist.");
            // maybe return a message?
        }

        // password comparison
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Password is incorrect.");
            // maybe return a message?
        }

        // generate JWT (access + refresh)
        console.log("User before token generation:", user);
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

        // save refresh token to DB
        await dbRefToken.insertToken(refreshToken);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
}

// DELETE /auth/log-out -> delete all user tokens
async function logOut(req, res, next) {
    const refreshToken = req.body.token;

    try {
        await dbRefToken.deleteToken(refreshToken);
        res.json({ message: "User logged out." });
    } catch (error) {
        next(error);
    }
}

// POST /auth/token -> refreshes access token
async function refreshToken(req, res, next) {
    const refreshToken = req.body.token;

    // check if token value is null/undefined
    if (!refreshToken) {
        return res.status(401).json({ message: "Token has no value." });
    }

    // check if token exists
    if (!(await dbRefToken.checkTokenExistance(refreshToken))) {
        return res.status(404).json({ message: "Token does not exist." });
    }

    // check refresh token validity & generate access token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("Error occured: ", err);
            return res.status(500).json({ message: "Failed to refresh access token.", error: err });
        }

        const userPayload = {
            id: user.id,
            fullName: user.fullName,
            role: user.role,
            username: user.username,
            password: user.password,
            email: user.email
        }
        //console.log("Generating new access token for user: ", userPayload);
        const accessToken = generateAccessToken(userPayload);

        console.log("New access token generated:", accessToken);

        res.json({ accessToken });
    })
}

export default {
    signUp,
    logIn,
    logOut,
    refreshToken
}