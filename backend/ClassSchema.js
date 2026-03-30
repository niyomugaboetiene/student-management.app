import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const ClassSchema = mongoose.Schema({
    course_id: { required: true, unique: true, type: Number },
    course_name: { required: true, type: String },
    code: { required: true, type: String },
    instructor: { required: true, type: String },
    students: { required: true, type: Number },
    duration: {type: Date, required: true },
    fees: { type: Number, required: true },
});

ClassSchema.plugin(AutoIncrement, { inc_field: 'admin_id' });
export default mongoose.model("student", StudentSchema);