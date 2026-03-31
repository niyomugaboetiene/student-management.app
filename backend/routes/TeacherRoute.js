    // class: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "class" }],

    import TeacherSchema from "../schema/TeacherSchema.js";
    import express from "express";
    import bcrypt from "bcrypt";

    const router = express();
    
    router.post('/register', async (req, res) => {
        //     student_id, full_name,  email, qualification, phone, gender, experience, department, salary, class
    
            try {
                const { full_name, email, qualification, phone, gender, experience, department, salary, password, classe } = req.body;
    
                if (!full_name || !gender || !email || !qualification || !phone || !experience || !department || !salary || !password || !classe ) {
                     return res.status(404).json({ message: 'Fill some missing fields' }); 
                }
    
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
    
                await StudentSchema.create({
                    full_name,
                    gender,
                    email,
                    roll,
                    qualification,
                    phone,
                    experience,
                    department,
                    salary,
                    password: hashedPassword,
                    class: classe,
                });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error'});
            }
    })
    
    export default router;