import express from "express";
import AttendanceSchema from "../schema/AttendanceSchema.js";

const router = express.Router();

router.post('/attendance', async (req, res) => {
    //     student, class, marked_by, date status

    try {
        const { student, classe, marked_by, date, status } = req.body;

        if (!student || !classe || !marked_by || !date || !status) {
            return res.status(403).json({ message: 'Fill out each field' });
        }

        const newAttendance = await AttendanceSchema.create({
            student,
            class: classe,
            marked_by,
            date,
            status
        });


        return res.status(201).json({
            message: `Student's attendance`,
            attendance: newAttendance
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error '});
    }
});

router.get('/attendanceList', async (req, res) => {
    try {
        const attendanceList = await AttendanceSchema.find();

        if (attendanceList.length === 0) {
            return res.status(404).json({ message: 'No attendance in the system. try to add some' });
        }

        return res.status(200).json({ message: 'Attendance list', attendance: attendanceList });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// get attendance by date/class
router.get('/', async (req, res) => {
    try {
        const { day, month, class_id } = req.query;
        
        const year = new Date().getFullYear();
        const start = new Date(year, month - 1, day, 0, 0, 0);
        const end = new Date(year, month - 1, day, 23, 59, 59);

        const attendance = await AttendanceSchema.find({
            class_id,
            date: { $gte: start, $lte: end }
        });

        if (attendance.length === 0) {
            return res.status(404).json({ message: 'No attendance done on this day' });
        }

        return res.status(200).json({
            message: 'Attendance details',
            attendances: attendance
        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router