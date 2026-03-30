import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const MarkSchema = mongoose.Schema({
    marks_id: { required: true, unique: true, type: Number },
    student: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "student" },
    code: { required: true, type: String },
    instructor: { required: true, type: String },
    students: { required: true, type: Number },
    duration: {type: Date, required: true },
    fees: { type: Number, required: true },
});

MarkSchema.plugin(AutoIncrement, { inc_field: 'admin_id' });
export default mongoose.model("student", MarkSchema);
