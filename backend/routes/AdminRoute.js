import express from "express";
import AdminSchema from "../schema/AdminSchema.js"
import bcrypt, { hash } from "bcrypt";
import StudentSchema from "../schema/StudentSchema.js";
import SubjectSchema from "../schema/SubjectSchema.js";
import TeacherSchema from "../schema/TeacherSchema.js";
import TradeSchema from "../schema/TradeSchema.js";
import DepartmentSchema from "../schema/DepartmentSchema.js";
import ClassSchema from "../schema/ClassSchema.js";

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

// * report
router.get('/report', async (req, res) => {
    try {
        const totalStudent = await StudentSchema.countDocuments();
        const totalSubject = await SubjectSchema.countDocuments();
        const totalTeacher = await TeacherSchema.countDocuments();
        const totalTrade = await TradeSchema.countDocuments();
        const totalDepartment = await DepartmentSchema.countDocuments();
        const totalClass = await ClassSchema.countDocuments();

        return res.status(200).json({
            message: 'Total',
            class: totalClass,
            subject: totalSubject,
            student: totalStudent,
            teacher: totalTeacher,
            trade: totalTrade,
            department: totalDepartment
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        const adminUsers = await AdminSchema.findOne({ _id });

        if (!adminUsers) {
            return res.status(404).json({ message: "Entered Id is not found" });
        }

        return res.status(200).json({
            message: "Admin Users",
            Admin_Users: adminUsers
        });
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
});

router.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        const isExist = await AdminSchema.findOne({ _id: _id });

        if (!isExist) {
          return res.status(404).json({ message: "Entered Ids is not found. try new Id" });
        }

        await AdminSchema.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Admin user deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

export default router