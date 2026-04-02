import DepartmentSchema from "../schema/DepartmentSchema";
import express from "express";

const router = express.Router()

router.post('/add', async (req, res) => {
    try {
        //     department_id, name ,description, building, ,HOD ,teachers
        
        const { name, description, building, hod, teachers } = req.body;

        if (!name || !hod || !teachers) {
            return res.status(403).json({ message: 'Fill some missing fields' });
        }

        let newFields = {};
        if (name) newFields.name = name;
        if (description) newFields.description = description;
        if (building) newFields.building = building;
        if (hod) newFields.hod = hod;
        if (teachers) newFields.teachers = teachers;
        
        const newData = await DepartmentSchema.create(newFields);

        return res.status(201).json({ 
            success: true, 
            message: 'New department added successfully',
            department: newData
        });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server error' });
    }
});

export default router;