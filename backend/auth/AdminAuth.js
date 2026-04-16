import AdminSchema from "../schema/AdminSchema.js";
import express from "express";

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { full_name, phone, password } = req.body;
        
    }
})