    // class: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "class" }],

    import TeacherSchema from "../schema/TeacherSchema.js";
    import express from "express";

    const router = express();
    
    function isAdmin (req, res, next) {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Login first'});
        }

        if (req.session.user.role === "admin") {
            next();
        } else {
            res.status(403).json({ message: 'You dont have access to this data'});
            return;
        }
    }
    router.get('/teacher_list', isAdmin, async (req, res) => {
        try {
            const result = await TeacherSchema.find().populate("class").populate("department");

            if (result.length > 0) {
                return res.status(200).json({
                    message: 'Teacher list',
                    teacher: result
                });
            } else {
                return res.status(404).json({ message: 'No teachers in the system' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
    
    router.get('/:_id', isAdmin, async (req, res) => {
        try {
            const _id  = req.params;
 
            if (!_id) {
                return res.status(403).json({ message: 'Ids required' });
            }

            const teacher = await TeacherSchema.findById(_id).populate("class").populate("department");

            if (!teacher) {
                return res.status(404).json({ message: 'No student details' });
            }
            return res.status(200).json({
                message: 'Teacher details',
                teacher: teacher
            }); 
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    // get teaceher by class
    router.get('/class/:class', isAdmin, async (req, res) => {
        try {
            const classe = req.params.class;
 
            if (!classe) {
                return res.status(403).json({ message: 'Ids required' });
            }

            const teacher = await TeacherSchema.find({ class: classe }).populate("class").populate("department");

            if (!teacher) {
                return res.status(404).json({ message: 'No student details' });
            }
            return res.status(200).json({
                message: 'Teacher details',
                teacher: teacher
            }); 
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });

router.put('/update/:_id', isAdmin, async (req, res) => {
    try {
        const _id = req.params;
        const { full_name, email, qualification, phone, gender, experience, department, salary, classe } = req.body;

        let updateFields = {};

        if (full_name) updateFields.full_name = full_name;
        if (qualification) updateFields.qualification = qualification;
        if (email) updateFields.email = email;
        if (phone) updateFields.phone = phone;
        if (gender) updateFields.gender = gender;
        if (experience) updateFields.experience = experience;
        if (department) updateFields.department = department;
        if (salary) updateFields.salary = salary;
        if (classe) updateFields.class = classe;

        const newData = await TeacherSchema.findByIdAndUpdate(_id, updateFields, { new: true });

        return res.status(201).json({ message: 'Teacher update successfully', new: newData });
    } catch (err) {
        console.error("Error: ", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/delete/:_id', isAdmin, async ( req, res ) => {
    try {
        const _id = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'Ids required' });
        }

        const isIdExist = await TeacherSchema.findById(_id);

        if (isIdExist.length === 0) {
            return res.status(404).json({ message: 'Id does not exist' });
        }

        await TeacherSchema.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Teacher deleted successfully' });
    }  catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
})
export default router;