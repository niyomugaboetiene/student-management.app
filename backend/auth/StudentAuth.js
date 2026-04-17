import express from "express";
import StudentSchema from "../schema/StudentSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/login', async () => {

    try {
        const { full_name, email, phone, password } = req.body;

        if (!full_name || !email || !phone || !password) {
            return res.status(403).json({ message: 'Fill out some missing fields' });
        }

      const isExist = await StudentSchema.findOne({
        full_name, email, phone
      });

      if (!isExist) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordToCompare = isExist.password;
      const isPasswordTrue = await bcrypt.hash(password, passwordToCompare);

      if (isPasswordTrue) {
           req.session.user = {
            full_name: full_name,
            email: email,
            phone: phone
           }

           return res.status(200).json({ message: 'Login successfully' });
      } 
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/register', async (req, res) => {
    //     student_id, full_name,  gender, roll, email, trade, phone, location, class, password, last_login, is_approved

        try {
            const { full_name, gender, email, trade, phone, location, classe, password } = req.body;

            if (!full_name || !gender || !email || !trade || !phone || !location || !classe || !password) {
                 return res.status(400).json({ message: 'Fill some missing fields' }); 
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
});

export default router;