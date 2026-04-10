import express from "express";
import SubjectRoute from "../schema/SubjectSchema.js";

const router = express.Router();

router.post('/add', async (req, res) => {
    //    subject_id, subject_name, code,   instructor, students, credits

    try {
        const { subject_name, code, instructor, class: classes, credits } = req.body;

        if (!subject_name || !code || !instructor || !classes || !credits) {
            return res.status(403).json({ messsage: 'Some fields are required' });
        }

        const newValue = await SubjectRoute.create({
            subject_name,
            code,
            instructor,
            classes,
            credits
        });

        return res.status(201).json({
            messsage: 'Subject added successfully',
            subject: newValue
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ messsage: 'Internal server error' });
    }
});

router.get('/subjectList', async (req, res) => {
    try {
        const result = await SubjectRoute.find();

        if (result.length === 0) {
            return res.status(404).json({ messsage: 'No subject in the system' });
        }

        return res.status(200).json({
            messsage: ''
        })
    } 
});

router.get('/:_id', async ( req, res) => {
    try {
        const _id = req.params;

        if (!_id) {
            return res.status(403).json({ messsage: 'IDs required' });
        }

        const result = await SubjectRoute.findById(_id);

        if (result.length === 0) {
            return res.status(200).json({
                messsage: 'Subject list',
                subject: result
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ messsage: 'Internal server error' });
    }
});

export default router;