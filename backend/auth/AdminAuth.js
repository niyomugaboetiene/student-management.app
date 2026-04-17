import AdminSchema from "../schema/AdminSchema.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { full_name, phone, password } = req.body;

        if (!full_name || !phone || !password) {
           return res.status(403).json({ message: 'Fill out each field' });
        }

        const isExist = await AdminSchema.findOne({
            full_name, phone
        });

        if (!isExist) {
            return res.status(401).json({ message: 'Try to fill out valid credentials' });
        }

        const passwordToCompare  = isExist.password;
        
        const isPasswordTrue = await bcrypt.compare(password, passwordToCompare);

        if (isPasswordTrue) {
            req.session.user = {
                full_name: full_name,
                phone: phone,
                email: isExist.email,
                location: isExist.location
            }

            return res.status(200).json({ message: 'Login successfully', user: req.session.user });
        } else {
            return  res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// register
router.post('/register', async (req, res) => {
   try {
    // admin_id,  full_name, email, phone, location, joined_at, password, last_login
    const { full_name, email, phone, location, password } = req.body;

    if (!full_name || !email || !phone || !location || !password) {
        return res.status(400).json({ message: "Fill some missing fields" });
    }

    const isEmailExist = await AdminSchema.find({ email: email });

    if (isEmailExist) {
        return res.status(403).json({ message: 'Email must be unique' });
    }
    
    const isPhoneExist = await AdminSchema.find({ phone: phone });

    if (isPhoneExist) {
        return res.status(403).json({ message: 'Phone must be unique' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const joined_at = new Date();
    await AdminSchema.create({
        full_name,
        email,
        phone,
        location,
        password: hashedPassword,
        joined_at
    });

    return res.status(201).json({ 
        success: true,
        message: "Admin successfully created account"
    });
   } catch (err) {
        console.error("ERROR", err);
        return res.status(500).json({ message: "Server error" });
   }
});

export default router;
