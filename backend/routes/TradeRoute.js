import express, { json } from "express";  
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

        const newTrade = await TradeSchema.create(createFields);

        return res.status(201).json({
            message: 'New trade added successfully',
            new: newTrade
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Servier error" });
    }
});


router.get('/tradeList', async (req, res) => {
    try {
        const list = await TradeSchema.find();

        if (list.length === 0) {
            return res.status(404).json({ message: 'No trade in the system' });
        }

        return res.status(200)/json({
            message: 'Trade list',
            Trade: list
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
})