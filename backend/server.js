import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.js";
import deviceRouter from "./routes/device.js";
import historyRouter from "./routes/history.js";
import clientRouter from "./routes/client.js";
import authRouter from "./routes/auth.js";
import errorHandling from "./middleware/errorHandling.js";

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
//app.use("/api/", index.indexRouter);
app.use("/api/users", userRouter);
app.use("/api/devices", deviceRouter);
app.use("/api/history", historyRouter);
app.use("/api/clients", clientRouter);
app.use("/auth", authRouter);

// error handling
app.use(errorHandling);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});