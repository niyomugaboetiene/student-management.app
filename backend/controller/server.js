import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "../db/connection.js";
import AdminRoute from "../routes/AdminRoute.js";

connection();

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// * Middle ware

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});