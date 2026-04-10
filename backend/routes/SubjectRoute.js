import express from "express";
import SubjectSchema from "../schema/SubjectSchema.js";

const router = express.Router();

router.post('/add', async (req, res) => {
    //    subject_id, subject_name, code,   instructor, students, credits

    try {
        const { subject_name, code, instructor, class: classes, credits } = req.body;

        if (!subject_name || !code || !instructor || !classes || !credits) {
            return res.status(403).json({ messsage: 'Some fields are required' });
        }

        const newValue = await SubjectSchema.create({
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
        const result = await SubjectSchema.find();

        if (result.length === 0) {
            return res.status(404).json({ messsage: 'No subject in the system' });
        }

        return res.status(200).json({
            messsage: 'Subject list',
            subject: result
        });
    }  catch (err) {
        console.error(err);
        return res.status(500).json({ messsage: 'Internal server error' });
    }
});

router.get('/:_id', async ( req, res) => {
    try {
        const _id = req.params;

        if (!_id) {
            return res.status(403).json({ messsage: 'IDs required' });
        }

        const result = await SubjectSchema.findById(_id);

        if (result.length === 0) {
            return res.status(404).json({
                messsage: 'No subject found',
            });
        }

         return res.status(404).json({
            messsage: 'Subject list',
            subject: result
         });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ messsage: 'Internal server error' });
    }
});

router.put('/update/:_id', async (req, res) => {
    try {
        const _id = req.params;
               
        const { subject_name, code, instructor, class: classes, credits } = req.body;

       let updateFields = {};

       if (subject_name) updateFields.subject_name = subject_name;
       if (code) updateFields.code = code;
       if (instructor) updateFields.instructor = instructor;
       if (classes) updateFields.class = classes;
       if (credits) updateFields.credits = credits;


       const newValue = await SubjectSchema.findByIdAndUpdate(_id, updateFields, { new: true });

       return res.status(201).json({ messsage: 'New Subject value', new: newValue });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ messsage: 'Internal server error' });
    }
})
export default router;