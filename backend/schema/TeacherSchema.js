import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);

const TeacherSchema = mongoose.Schema({
    teacher_id: { unique: true, type: Number },
    full_name: { required: true, type: String },
    email: { required: true, type: String },
    qualification: { required: true, type: String },
    phone: { required: true, type: String },
    gender: { required: true, type: String },
    exprerience: {type: String },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
    password: { type: String, required: true },
    last_login: { type: Date },
    is_approved: { tyoe: Boolean, default: false}, 
    class: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "classes" }],

}, { timestamps: true });

TeacherSchema.plugin(AutoIncrement, { inc_field: 'teacher_id' });
export default mongoose.model("teachers", TeacherSchema);