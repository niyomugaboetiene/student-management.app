    // class: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "class" }],

    import ClassSchema from "../schema/ClassSchema.js";
    import express from "express";

    const router = express();
    
    router.post('/add', async (req, res) => {
        // class_name, code, year, teacher, createdBy
    
            try {
                const { class_name, code, year, teacher, createdBy } = req.body;
    
                if (!class_name || !teacher || !createdBy) {
                     return res.status(404).json({ message: 'Fill some missing fields' }); 
                }
    
                await ClassSchema.create({
                    class_name,
                    code,
                    year,
                    teacher,
                    createdBy,
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

router.get("/:id", async (req, res) => {
    try {
        const { _id } = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'Id required' });
        }

        const ClassList = await ClassSchema.findOne(_id);

        if (!ClassList) {
            return res.status(404).json({ message: 'Id does not exist' });
        }

        return res.status(200).json({ message: 'Classes', classes: ClassList });

    } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error'});
    }
})
    
    export default router;