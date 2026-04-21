import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const MarkSchema = mongoose.Schema({
    marks_id: { unique: true, type: Number },
    student: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "students" },
    class: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "classes" },
    subject: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "subjects" },
    marks: { required: true, type: Number },
}, { timestamps: true });

MarkSchema.plugin(AutoIncrement, { inc_field: 'marks_id' });
export default mongoose.model("marks", MarkSchema);
