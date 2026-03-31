import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const ClassSchema = mongoose.Schema({
    class_id: { required: true, unique: true, type: Number },
    class_name: { required: true, type: String },
    code: { required: true, type: String },
    year: { required: true, type: Number },
    teacher: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "teacher" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "admin" }
    
}, { timestamps: true });

ClassSchema.plugin(AutoIncrement, { inc_field: 'class_id' });
export default mongoose.model("class", ClassSchema);