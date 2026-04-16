import express from "express";
import AttendanceSchema from "../schema/AttendanceSchema.js";
import StudentSchema from "../schema/StudentSchema.js";
import ClassSchema from "../schema/ClassSchema.js";

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

// get attendance by date/class/student
router.get('/get', async (req, res) => {
    try {
        const { day, month, student_id } = req.query;
        
        const year = new Date().getFullYear();
        const start = new Date(year, month - 1, day, 0, 0, 0);
        const end = new Date(year, month - 1, day, 23, 59, 59);

        const student_details = await StudentSchema.findById({_id: student_id});

        if (!student_details) {
            return res.status(404).json({ message: 'No student found for this ID' });
        }

        const class_of_student = student_details.class;

        const attendance = await AttendanceSchema.find({
            student_id, class_of_student, 
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

// full reprort of attendance per class
router.get('/full/:_id', async (req, res) => {
    try {
        const _id = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'Fill out class id'});
        } 

        const isExist = await ClassSchema.findById(_id);

        if (!isExist) {
            return res.status(404).json({ message: `Class didn't found` });
        }

        const classAttendance = await AttendanceSchema.find({
            class: _id
        });

        if (classAttendance.length === 0) {
            return res.status(404).json({ message: 'This class has no attendance' });
        }

        return res.status(200).json({ message: 'Class attendance', attendance: classAttendance });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Intenral server error' });
    }
});

// get fully atteandance per student
router.get('/stud/:_id', async (req, res) => {
    try {
        const _id =  req.params;
        if (!_id) {
            return res.status(403).json({ message: 'Fill out student id' });
        }

        const isExist = await StudentSchema.findById({_id: _id });

        if (!isExist) {
            return res.status(404).json({ message: 'Enter a valid student id' });
        }

        const studentAttendance = await AttendanceSchema.find({
            student: _id
        });

        if (!studentAttendance) {
            return res.status(404).json({ message: 'NO attendance for this student' });
        }

        return res.status(200).json({ message: `Student attendance`, attendance: studentAttendance });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Intenral server error' });
    }
});
export default router