import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);

const AttendanceSchema = mongoose.Schema({
    attendance_id: { required: true, unique: true, type: Number },
    student: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "student" },
    class: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "class" },
    course: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "course" },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent"], default: "absent"}
});

AttendanceSchema.plugin(AutoIncrement, { inc_field: 'department_id' });
export default mongoose.model("teacher", AttendanceSchema);