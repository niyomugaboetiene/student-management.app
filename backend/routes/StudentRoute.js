import StudentSchema from "../schema/StudentSchema.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

function isAuthenticated (req, res, next) {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Login first'});
        }

        if (req.session.user.role === "admin" || req.session.user.role === "teacher") {
            next();
        } else {
            res.status(403).json({ message: 'You dont have access to this data'});
            return;
        }
}

router.get("/studentList", async (req, res) => {
    try {
        const StudentList = await StudentSchema.find();

        if (StudentList.length === 0) {
            return res.status(404).json({ message: 'No student in database' });
        }

        console.log("Student length", StudentList.length);
        return res.status(200).json({ message: 'Students', student: StudentList });

    } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error'});
    }
});

// get student based on class

router.get('/class/:class_id', async (req, res) => {
    try {
        const class_id = req.params.class_id;

        const result = await StudentSchema.find({ class: class_id });

        if (!result) {
           return res.status(404).json({ message: 'No student in this class' });
        }

        return res.status(200).json({ message: 'Class list', student: result });
    } catch (err) {
        console.error("ERROR", err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.get("/:_id", async (req, res) => {
    try {
        const { _id }   = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'Id required' });
        }

        const student = await StudentSchema.findById(_id).populate("trade").populate("class");

        if (!student) {
            return res.status(404).json({ message: 'Id does not exist' });
        }

        return res.status(200).json({ message: 'Students', student: student });

    } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error'});
    }
});


router.put('/update/:_id', isAuthenticated, async (req, res) => {
    try {
        const _id = req.params;
        const { full_name, gender, email, trade, phone, location, classe, password } = req.body;

        if (!_id) {
            return res.status(403).json({ message: 'Id required' });
        }

        const StudentList = await StudentSchema.findOne(_id);

        if (!StudentList) {
            return res.status(404).json({ message: 'Id does not exist' });
        }

      let updateFields = {};
      if (full_name) updateFields.full_name = full_name;
      if (gender) updateFields.gender = gender;
      if (email) updateFields.email = email;
      if (trade) updateFields.trade = trade;
      if (phone) updateFields.phone = location;
      if (location) updateFields.location = location;
      
      if (classe) updateFields.class = classe;
            
      if (password) {
           const salt = await bcrypt.genSalt(10);
           const hashedPassword = await bcrypt.hash(password, salt);
           updateFields.password = hashedPassword;
     }

      const updated = await StudentSchema.findByIdAndUpdate(_id, updateFields, { new: true });

      return res.status(201).json({ 
        message: 'Student updated successfully',
        success: true,
        new_data: updated
      });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/delete/:_id', isAuthenticated, async (req, res) => {
    try {
        const _id = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'Id is required' });
        }
      
        const StudentList = await StudentSchema.findOne(_id);

        if (!StudentList) {
            return res.status(404).json({ message: 'Id does not exist' });
        }

        await StudentSchema.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json("Server error");
    }
});

export default router;