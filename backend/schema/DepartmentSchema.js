import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);

const DepartmentSchema = mongoose.Schema({
    department_id: { required: true, unique: true, type: Number },
    name: { required: true, type: String },
    description: { required: true, type: String },
    building: { required: true, type: String },
    HOD: { type: mongoose.Schema.Types.ObjectId, ref: "teacher"},
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }],
    course: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
}, { timestamp: true});

DepartmentSchema.plugin(AutoIncrement, { inc_field: 'department_id' });
export default mongoose.model("department", DepartmentSchema);