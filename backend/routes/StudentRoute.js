import StudentSchema from "../schema/StudentSchema.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

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


router.get("/studentList", async (req, res) => {
    try {
        const StudentList = await StudentSchema.find();

        if (StudentList.length === 0) {
            return res.status(404).json({ message: 'Id does not exist' });
        }

        console.log("Student length", StudentList.length);
        return res.status(200).json({ message: 'Students', student: StudentList });

    } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error'});
    }
});

router.get("/:_id", async (req, res) => {
    try {
        const { _id }   = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'Id required' });
        }

        const student = await StudentSchema.findById(_id);

        if (!student) {
            return res.status(404).json({ message: 'Id does not exist' });
        }

        return res.status(200).json({ message: 'Students', student: student });

    } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error'});
    }
});


router.put('/update/:_id', async (req, res) => {
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

router.delete('/delete/:_id', async (req, res) => {
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