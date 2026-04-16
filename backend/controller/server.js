import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

// * routes
import connection from "../db/connection.js";
import AdminRoute from "../routes/AdminRoute.js";
import StudentRoute from "../routes/StudentRoute.js";
import ClassRoute from "../routes/ClassRoute.js";
import TeacherRoute from "../routes/TeacherRoute.js";
import MarksRoute from "../routes/MarksRoute.js";
import DepartmentRoute from "../routes/DepartmentRoute.js";
import SubjectRoute from "../routes/SubjectRoute.js";
import TradeRoute from "../routes/TradeRoute.js";
import AttendanceRoute from "../routes/AttendanceRoute.js";

// * we use connect mongo to store user session in mongoDB Instead of RAM
import MongoStore from "connect-mongo";

dotenv.config();

connection();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use(session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: `mongodb://${process.env.MONG_URL}`
    }),
    cookie: {
        httpOnly: true,
        secure: false,
        // 1000 -> 1 sec, 60 -> 1 min, 60 -> 1 hr, 24 -> day 
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
}));

// * Middle ware
app.use("/admin", AdminRoute);
app.use("/student", StudentRoute);
app.use("/class", ClassRoute);
app.use("/department", DepartmentRoute);
app.use("/teacher", TeacherRoute);
app.use("/marks", MarksRoute);
app.use("/subjects", SubjectRoute);
app.use("/trade", TradeRoute);
app.use("/attendance", AttendanceRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// npm install mongoose@6.10.2  