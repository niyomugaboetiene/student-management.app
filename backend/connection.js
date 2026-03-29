import mongoose from "mongoose";

const connection = 
    mongoose.connect("mongodb://127.0.0.1:27017/student-management-system")
    .then(() => console.log("connected successfully"))
    .catch((err) => console.error(err));


export default connection;