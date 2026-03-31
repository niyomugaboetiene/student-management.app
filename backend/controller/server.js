import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "../db/connection.js";
import AdminRoute from "../routes/AdminRoute.js";
import StudentRoute from "../routes/StudentRoute.js";
dotenv.config();

connection();

const app = express();
app.use(express.json());
app.use(cors());

// * Middle ware
app.use("/admin", AdminRoute);
app.use("/student", StudentRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// npm install mongoose@6.10.2