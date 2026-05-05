    // class: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "class" }],

    import ClassSchema from "../schema/ClassSchema.js";
    import express from "express";

    const router = express();

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
    
    router.post('/add', isAdmin, async (req, res) => {
        // class_name, code, year, teacher, createdBy
    
        
            try {
                const { class_name, code, year, teacher, trade } = req.body;
    
                if (!class_name || !teacher || !trade) {
                     return res.status(404).json({ message: 'Fill some missing fields' });
                }
            
                const createdBy = req.session.user.id;
                await ClassSchema.create({
                    class_name,
                    code,
                    year,
                    teacher,
                    createdBy,
                    trade
                });

               return res.status(201).json({ 
                   success: true,
                  message: "Class created successfully"
               });

            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error'});
            }
    });

router.get("/class_list", async (req, res) => {
    try {

        const ClassList = await ClassSchema.find().populate("teacher").populate("trade");

        if (!ClassList) {
            return res.status(404).json({ message: 'No class in the system' });
        }

        return res.status(200).json({ message: 'Classes', classes: ClassList });

    } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error'});
    }
});

router.get("/get/:_id", async (req, res) => {
    try {
        const _id  = req.params._id;

        if (!_id) {
            return res.status(403).json({ message: 'Id required' });
        }

        const ClassList = await ClassSchema.findById(_id).populate("teacher").populate("trade");

        if (!ClassList) {
            return res.status(404).json({ message: 'Id does not exist' });
        }

        return res.status(200).json({ message: 'Classes', classes: ClassList });

    } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error'});
    }
});

router.put('/update/:_id', isAdmin, async (req, res) => {
    try {
        const _id = req.params;
       const { class_name, code, year, teacher, createdBy, trade } = req.body;
    

        if (!_id) {
            return res.status(403).json({ message: 'Id required' });
        }

        const ClassList = await ClassSchema.findOne(_id);

        if (!ClassList) {
            return res.status(404).json({ message: 'Id does not exist' });
        }
        
      let updateFields = {};
      if (class_name) updateFields.class_name = class_name;
      if (code) updateFields.code = code;
      if (year) updateFields.year = year;
      if (teacher) updateFields.teacher = teacher;
      if (createdBy) updateFields.createdBy = createdBy;
      if (trade) updateFields.trade = trade;


      const updated = await ClassSchema.findByIdAndUpdate(_id, updateFields, { new: true });

      return res.status(201).json({ 
        message: 'Class updated successfully',
        success: true,
        new_data: updated
      });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/delete/:_id', isAdmin, async (req, res) => {
    try {
        const _id = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'Id is required' });
        }

        const ClassList = await ClassSchema.findOne(_id);

        if (!ClassList) {
            return res.status(404).json({ message: 'Id does not exist' });
        }
        await ClassSchema.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Class deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json("Server error");
    }
});

export default router;