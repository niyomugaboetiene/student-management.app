import mongoose from "mongoose";

const connection = async () => {
    try {
           await mongoose.connect("mongodb://127.0.0.1:27017/student-management-system");
            console.log("connected successfully");
    } catch (err) {
        console.error("error", err);
        process.exit(1);
    }
};

connection();

export default connection;