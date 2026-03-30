import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connection = async () => {
    try {
          console.log(process.env.MONG_URL);
           await mongoose.connect(`mongodb://${process.env.MONG_URL}`);
            console.log("connected successfully");
    } catch (err) {
        console.error("error", err);
        process.exit(1);
    }
};

connection();

export default connection;