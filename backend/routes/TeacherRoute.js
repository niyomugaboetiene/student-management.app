    // class: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "class" }],

    import TeacherSchema from "../schema/TeacherSchema.js";
    import express from "express";
    import bcrypt from "bcrypt";

    const router = express();
    
    router.post('/register', async (req, res) => {
        //     student_id, full_name,  email, qualification, phone, gender, experience, department, salary, class
            try {
                const { full_name, email, qualification, phone, gender, experience, department, salary, password, classe } = req.body;
    
                //  console.log(
                //     `received fileds. 1. full_name ${full_name}, 2. gender: ${gender}, 3. email ${email}
                //     4. qualification ${qualification}, 5. phone ${phone}, 6. experience ${experience}, 7. department ${department}
                //     8. salary ${salary}, 9. password: ${password}, 10. class ${classe}`
                // );

                if (!full_name || !gender || !email || !qualification || !phone || !experience || !department || !salary || !password || !classe ) {
                     return res.status(404).json({ message: 'Fill some missing fields' }); 
                }
    
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);


         
                console.log("experience", experience);
                await TeacherSchema.create({
                    full_name,
                    gender,
                    email,
                    qualification,
                    phone,
                    experience,
                    department,
                    salary,
                    password: hashedPassword,
                    class: classe,
                });
           
                return res.status(201).json({ 
                    success: true,
                    message: "Teacher successfully created account"
                });

            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error'});
            }
    });

    router.get('/teacher_list', async (req, res) => {
        try {
            const result = await TeacherSchema.find();

            if (result.length > 0) {
                return res.status(200).json({
                    message: 'Teacher list',
                    student: result
                });
            } else {
                return res.status(404).json({ message: 'No teachers in the system' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
    
    router.get('/:_id', async (req, res) => {
        try {
            const _id  = req.params;
 
            if (!_id) {
                return res.status(403).json({ message: 'Ids required' });
            }

            const teacher = await TeacherSchema.findById(_id);

            if (teacher.lenth === 0) {
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

router.put('/update/:_id', async (req, res) => {
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

router.delete('/delete/:_id', async ( req, res ) => {
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