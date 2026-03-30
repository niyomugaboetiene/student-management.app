import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);

const TeacherSchema = mongoose.Schema({
    teacher_id: { required: true, unique: true, type: Number },
    full_name: { required: true, type: String },
    email: { required: true, type: String },
    qualification: { required: true, type: String },
    phone: { required: true, type: Number },
    exprerience: {type: Number, required: true },
    department: { type: Number, required: true },
    salary: { type: Number, required: true },
    class: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "class" }],
}, { timestamps: true });

TeacherSchema.plugin(AutoIncrement, { inc_field: 'teacher_id' });
export default mongoose.model("teacher", TeacherSchema);