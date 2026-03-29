import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const StudentSchema = mongoose.Schema({
    student_id: { required: true, unique: true, type: Number },
    full_name: { required: true, type: String },
    roll: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "class" },
    email: { required: true, unique: true, type: String },
    course: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "course" },
    phone: { required: true, unique: true, type: String },
    location: { required: true, unique: true, type: String },
    joined_at: {type: Date, default: Date.now() },
    password: { type: String },
    last_login: { type: Date },
    is_approved: { type: Boolean, default: false }
});

StudentSchema.plugin(AutoIncrement, { inc_field: 'student_id'});
export default mongoose.model("student", StudentSchema);