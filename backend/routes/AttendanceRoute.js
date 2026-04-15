import express from "express";
import AttendanceSchema from "../schema/AttendanceSchema.js";

const router = express.Router();

router.post('/attendance', (req, res) => {
    //     student, class, marked_by, date status

    try {
        const { student_name, class: classe, marked_by, date, status } = req.body;

        if (!student_name || !classe || !marked_by | !date || !status) {
            return res.status(403).json({ message: 'Fill out each field' });
        }

        const newAttendance = await AttendanceSchema.create({
            student_name,
            classe,
            marked_by,
            date,
            status
        });
    }
})