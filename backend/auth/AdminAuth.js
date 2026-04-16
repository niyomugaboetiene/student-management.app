import AdminSchema from "../schema/AdminSchema.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { full_name, phone, password } = req.body;

        if (!full_name, !phone, !password) {
           return res.status(403).json({ message: 'Fill out each field' });
        }

        const isExist = await AdminSchema.find({
            full_name, phone
        });

        if (!isExist) {
            return res.status(404).json({ message: 'Try to fill out valid credentials' });
        }

        const passwordToCompare  = isExist.password;
        
        const isPasswordTrue = await bcrypt.compare(password, passwordToCompare);

        if (isPasswordTrue) {
            req.session.user = {
                full_name: full_name,
                phone: phone,
                email: isExist.email
            }

            return res.status(200).json({ message: 'Login successfully', user: req.session.user.full_name });
        } else {
            return  res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
