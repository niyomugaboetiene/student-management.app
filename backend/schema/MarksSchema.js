import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const MarkSchema = mongoose.Schema({
    marks_id: { required: true, unique: true, type: Number },
    student: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "student" },
    course: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "course" },
    subject: { required: true, type: String },
    students: { required: true, type: Number },
    duration: {type: Date, required: true },
    fees: { type: Number, required: true },
}, { timestamp: true});

MarkSchema.plugin(AutoIncrement, { inc_field: 'marks_id' });
export default mongoose.model("student", MarkSchema);
