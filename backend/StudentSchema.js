import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const StudentSchema = mongoose.Schema({
    student_id: { required: true, unique: true, type: Number },
    full_name: { required: true, unique: true, type: String },
    roll: { required: true, unique: true, type: Number, ref: "class" },
    email: { required: true, unique: true, type: String },
    course: { required: true, unique: true, type: Number, ref: "course" },
    phone: { required: true, unique: true, type: String }
});

StudentSchema.plugin(AutoIncrement, { inc_field: 'student_id'});
export default mongoose.model("student", StudentSchema);