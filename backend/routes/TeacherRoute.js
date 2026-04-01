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
    })
    
    export default router;