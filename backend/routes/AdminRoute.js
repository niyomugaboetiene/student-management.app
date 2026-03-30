import express from "express";
import AdminSchema from "../schema/AdminSchema.js"
import bcrypt from "bcrypt";

const router = express();

router.post('/register', async (req, res) => {
   try {
    // admin_id,  full_name, email, phone, location, joined_at, password, last_login
    const { full_name, email, phone, location, password } = req.body;

    if (!full_name || !email || !phone || !location || !password) {
        return res.status(400).json({ message: "Fill some missing fields" });
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

export default router