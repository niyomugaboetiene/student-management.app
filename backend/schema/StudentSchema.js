import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const StudentSchema = mongoose.Schema({
    student_id: { unique: true, type: Number },
    full_name: { required: true, type: String },
    gender: { required: true, type: String, enum: ["male", "female"] },
    email: { required: true, unique: true, type: String },
    trade: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "trades" },
    phone: { required: true, unique: true, type: String },
    location: { required: true, type: String },
    class: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "classes" },
    password: { type: String },
    role: { type: String, default: "student"},
    last_login: { type: Date },
    is_approved: { type: Boolean, default: false }
}, { timestamps: true });

StudentSchema.plugin(AutoIncrement, { inc_field: 'student_id'});
export default mongoose.model("students", StudentSchema);