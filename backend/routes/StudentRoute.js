import StudentSchema from "../schema/StudentSchema.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express();

router.post('/register', async (req, res) => {
    //     student_id, full_name,  gender, roll, email, trade, phone, location, class, password, last_login, is_approved

        try {
            const { full_name, gender, email, trade, phone, location, classe, password } = req.body;

            if (!full_name || !gender || !email || !trade || !phone || !location || !classe || !password) {
                 return res.status(404).json({ message: 'Fill some missing fields' }); 
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await StudentSchema.create({
                full_name,
                gender,
                email,
                trade,
                phone,
                location,
                class: classe,
                password: hashedPassword
            });

            return res.status(201).json({ 
                success: true,
                message: "Student successfully account created"
           });
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error'});
        }
})

export default router;