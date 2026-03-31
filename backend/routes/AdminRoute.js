import express from "express";
import AdminSchema from "../schema/AdminSchema.js"
import bcrypt, { hash } from "bcrypt";

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

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        const adminUsers = await AdminSchema.findOne({_id: _id});
        if (adminUsers.length === 0) {
            return res.status(404).json({ message: "Entered Ids is not found. try new Id" });
        }

        return res.status(200).json({ message: "Admin Users", Admin_Users: adminUsers });
    } catch (err) {
        console.error("ERROR", err);
        return res.status(500).json({ message: "Server error" });
    }
});

router.put('/update/:_id', async ( req, res) => {
    try {
        const { full_name, email, phone, location, password } = req.body;
        const { _id } = req.params;

        const adminUsers = await AdminSchema.findOne({_id: _id});

        if(!adminUsers) {
            return res.status(404).json({ message: "Entered Ids is not found. try new Id" });
        }

        let updateFields = {};

        if (full_name) updateFields.full_name = full_name;
        if (email) updateFields.email = email;
        if (phone) updateFields.phone = phone;
        if (location) updateFields.location = location;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          updateFields.password = hashedPassword;
        }

        

        const updatedAdmin = await AdminSchema.findByIdAndUpdate(_id, { $set: updateFields }, 
            { new: true, runValidators: true }
        );

       return res.status(200).json({ 
          success: true,
          message: "Admin account updated successfully",
          admin: updatedAdmin
      });

    } catch (err) {
         console.error("ERROR", err);
        return res.status(500).json({ message: "Server error" });
    }



})
export default router