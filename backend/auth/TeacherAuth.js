
    import TeacherSchema from "../schema/TeacherSchema.js";
    import express from "express";
    import bcrypt from "bcrypt";

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

    router.post('/register', isAdmin, async (req, res) => {
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


    router.post('/login', async (req, res) => {
        try {
            const { full_name, phone, password } = req.body;

            if (!full_name || !phone || !password) {
                return res.status(403).json({ message: 'Fil out missing fields' });
            }

            const isExist = await TeacherSchema.findOne({
                full_name,
                phone
            });

            if (!isExist) {
                return res.status(404).json({ message: 'Invalid credentials'});
            }

            const passwordToCompare = isExist.password;

            const isPasswordTrue = await bcrypt.compare(password, passwordToCompare);

            if (isPasswordTrue) {
                req.session.user = {
                    full_name: full_name,
                    phone: phone,
                    role: isExist.role,
                }

                return res.status(200).json({ message: 'Login successfully', teacher: req.session.user });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error'});
        }
    });
    export default  router;