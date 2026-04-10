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

    }
})