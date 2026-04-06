import DepartmentSchema from "../schema/DepartmentSchema.js";
import express from "express";
import TeacherSchema from "../schema/TeacherSchema.js";

const router = express.Router()

router.post('/add', async (req, res) => {
    try {
        //     department_id, name ,description, building, ,HOD ,teachers
        
        const { name, description, building, HOD, teachers } = req.body;

        if (!name || !HOD || !teachers) {
            return res.status(403).json({ message: 'Fill some missing fields' });
        }

        const is_HODExist = await TeacherSchema.findOne({_id: HOD });

        if (!is_HODExist) {
            return res.status(404).json({ message: 'HOD Not exist' });
        }

        let newFields = {};
        if (name) newFields.name = name;
        if (description) newFields.description = description;
        if (building) newFields.building = building;
        if (HOD) newFields.hod = HOD;
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