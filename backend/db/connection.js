import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connection = async () => {
    try {
           await mongoose.connect(`${process.env.MONG_URL}`);
            console.log("connected successfully");
    } catch (err) {
        console.error("error", err);
        process.exit(1);
    }
};

connection();

export default connection;