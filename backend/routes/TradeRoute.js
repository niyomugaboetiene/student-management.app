import express from "express";  
import TradeSchema from "../schema/TradeSchema.js";

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        // trade_name, code, department, duration
        const { trade_name, code, department } = req.body;

        if (!trade_name || !department) {
            return res.status(403).json({ message: 'Trade name or department must be filled' });
        }

        let createFields = {}
        if (trade_name) createFields.trade_name = trade_name;
        if (code) createFields.code = code;
        if (department) createFields.department = department;
    }
})