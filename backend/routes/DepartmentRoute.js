import DepartmentSchema from "../schema/DepartmentSchema.js";
import express from "express";
import TeacherSchema from "../schema/TeacherSchema.js";

const router = express.Router()

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
    try {
        //     department_id, name ,description, building, ,HOD ,teachers
        
        const { name, description, building, HOD } = req.body;

        if (!name || !HOD) {
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
        if (HOD) newFields.HOD = HOD;
        
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

router.get('/department_list', async (req, res) => {
    try {
        const result = await DepartmentSchema.find().populate("HOD");

        if (!result) {
            return res.status(404).json({ message: 'No department im the system' });
        }

        return res.status(200).json({
            message: 'Department list',
            department: result
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/get/:_id', async (req, res) => {
    try {
        const  _id = req.params;

        if (!_id) {
            res.status(403).json({ message: 'ID is required' });
        }
        
        const result = await DepartmentSchema.findOne(_id);

        if (!result) {
            return res.status(404).json({ message: 'No department im the system' });
        }

        return res.status(200).json({
            message: 'Department list',
            department: result
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.put('/update/:_id', isAdmin, async (req, res) => {
    try {
        const { name, description, building, HOD } = req.body;
        const _id = req.params;

        if (!name || !HOD) {
            return res.status(403).json({ message: 'Fill some missing fields' });
        }

        const is_HODExist = await TeacherSchema.findOne({ HOD: HOD });

        if (!is_HODExist) {
            return res.status(404).json({ message: 'Please enter the real HOD id' });
        }

        let updateFields = {};

        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (building) updateFields.building = building;
        if (HOD) updateFields.HOD = HOD;

        const newData = await DepartmentSchema.findByIdAndUpdate(_id, updateFields, { new: true });

        return res.status(200).json({
             message: 'Department updated successfully',
             newDep: newData
            }); 
    } catch (err) {
        console.error(err.message);
        return res.status(200).json({ message: 'Server error' });
    }
});

router.delete("/delete/:_id", isAdmin, async (req, res) => {
    try {
        const _id = req.params;

        if (!_id) {
            return res.status(403).json({ message: 'Ids is required for this action' });
        }

        const isExist = await DepartmentSchema.findOne(_id);

        if (!isExist) {
            return res.status(404).json({ message: 'Enter a valid IDs' });
        }

        await DepartmentSchema.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Department deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default router;