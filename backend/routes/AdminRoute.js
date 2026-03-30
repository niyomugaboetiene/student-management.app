import connection from "../db/connection.js";
import express from "express";

connection();

const router = express();

router.post('/admin/add', async (req, res) => {
   try {
    // admin_id,  full_name, email, phone, location, joined_at, password, last_login
    const { full_name, email, phone, location, password } = req.body;

    if (!full_name || !email || !phone || !location || !password) {
        return 
    }
   }
});