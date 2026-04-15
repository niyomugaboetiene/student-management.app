import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);

const AttendanceSchema = mongoose.Schema({
    attendance_id: { unique: true, type: Number },
    student: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "students" },
    class: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "classes" },
    marked_by: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "teachers" },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent"], default: "absent" }
}, { timestamps: true });

AttendanceSchema.plugin(AutoIncrement, { inc_field: 'attendance_id' });
export default mongoose.model("attendances", AttendanceSchema);