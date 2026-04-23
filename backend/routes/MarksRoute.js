import express from "express";
import MarksSchema from "../schema/MarksSchema.js";

const router = express.Router();

router.post('/add', async( req, res ) => {
    try {
        // student, class, subject, marks
        const { student, class: classes, subject, marks } = req.body;

        // console.log("Received fields", student, classes, subject, marks);
        
        if (!student || !classes || !subject || !marks) {
            return res.status(403).json({ message: 'Some fields are missing!'});
        }

       const newMarks = await MarksSchema.create({
        student,
        classes,
        subject,
        marks
       });

       return res.status(201).json({
          message: 'Marks added successfully',
          new: newMarks
       });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/marks_list', async (req, res) => {
    try {
        const result = await MarksSchema.find().populate("students").populate("classes").populate("subjects");

        if (result.length === 0) {
            return res.status(404).json({ message: 'No marks in the system' });
        }

        return res.status(200).json({ message: 'Marks', marks: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const _id = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'IDs required'});
        }

        const result = await MarksSchema.findById(_id).populate("students").populate("classes");

        if (result.length === 0) {
            return res.status(404).json({ message: 'No marks in the system' });
        }

        return res.status(200).json({ message: 'Marks', marks: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/student/:student_id', async (req, res) => {
    try {
        const student_id = req.params;

        if (!student_id) {
            return res.status(403).json({ message: 'IDs required' });
        }

        const result = await MarksSchema.findOne({student: student_id}).populate("students").populate("classes");

        if (result.length === 0) {
            return res.status(404).json({ message: 'No student marks' });
        }

        return res.status(200).json({ message: 'Student marks', marks: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update/:_id', async (req, res) => {
    try {
        const _id = req.params;
        const { student, classes, subject, marks } = req.body;

        let updateFields = {};

        if (student) updateFields.student = student;
        if (classes) updateFields.class = classes;
        if (subject) updateFields.subject = subject;
        if (marks) updateFields.marks = marks;

        const newData = await MarksSchema.findByIdAndUpdate(_id, updateFields, { new: true });

        return res.status(201).json({ message: 'Marks updated successfully', new: newData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/delete/:_id', async (req, res) => {
    try {
        const _id = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'IDs required' });
        }

        const isExist = await MarksSchema.findById(_id);

        if (isExist.length === 0) {
            return res.status(404).json({ message: 'No IDs in the system' });
        }

        await MarksSchema.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Marks deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.type(500).json({ message: 'Internal server error' });
    }
});

export default router;