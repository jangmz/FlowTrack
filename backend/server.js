import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// setting public files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware
app.use(cors());

// routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});