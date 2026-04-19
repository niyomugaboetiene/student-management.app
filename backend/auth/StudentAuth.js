import express from "express";
import StudentSchema from "../schema/StudentSchema.js";
import TradeSchema from "../schema/TradeSchema.js";
import ClassSchema from "../schema/ClassSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/login', async (req, res) => {

    try {
        const { full_name, phone, password } = req.body;

        if (!full_name || !phone || !password) {
            return res.status(403).json({ message: 'Fill out some missing fields' });
        }

      const isExist = await StudentSchema.findOne({
        full_name, phone, is_approved: true
      });

      if (!isExist) {
        return res.status(401).json({ message: 'Invalid credentials. or your account is not approved you can wait 24 hrs to be approved' });
      }

      const passwordToCompare = isExist.password;
      const isPasswordTrue = await bcrypt.compare(password, passwordToCompare);

      if (isPasswordTrue) {
           req.session.user = {
            full_name: full_name,
            id: isExist._id,
            email: isExist.email,
            location: isExist.location,
            phone: phone,
            role: isExist.role
           }
           return res.status(200).json({ message: 'Login successfully', student: req.session.user });
      } else {
        return res.status(401).json({ message: 'Invalid password'})
      }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// get trade and class
router.get('/trade', async (req, res) => {
    try {
        
          const availableTrade = await TradeSchema.find();

            if (availableTrade.length === 0) {
                return res.status(404).json({ message: 'No trade found' });
            } else {
               res.status(200).json({ trade: availableTrade });
            }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server eror'});
    }
});

// get trade and class
router.get('/class/:trade', async (req, res) => {
    try {
          const  { trade }  = req.params;
          if (!trade) return;
            // available class based on trade choosen
            const availableClass = await ClassSchema.find({ trade: trade });

            if (availableClass.length === 0) {
                return res.status(404).json({ message: 'No class found' });
            } 
              
            return res.status(200).json({ classes: availableClass });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server eror'});
    }
});

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

export default router;