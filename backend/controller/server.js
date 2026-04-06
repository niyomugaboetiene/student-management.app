import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "../db/connection.js";
import AdminRoute from "../routes/AdminRoute.js";
import StudentRoute from "../routes/StudentRoute.js";
import ClassRoute from "../routes/ClassRoute.js";
import TeacherRoute from "../routes/TeacherRoute.js";
import DepartmentRoute from "../routes/DepartmentRoute.js";
dotenv.config();

connection();

const app = express();
app.use(express.json());
app.use(cors());

// * Middle ware
app.use("/admin", AdminRoute);
app.use("/student", StudentRoute);
app.use("/class", ClassRoute);
app.use("/department", DepartmentRoute);
app.use("/teacher", TeacherRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// npm install mongoose@6.10.2