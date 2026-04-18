import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const ClassSchema = mongoose.Schema({
    class_id: {  unique: true, type: Number },
    class_name: { required: true, type: String },
    code: { type: String },
    year: {  type: String },
    teacher: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "teachers" },
    trade: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "trades"},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "admins" }
    
}, { timestamps: true });

ClassSchema.plugin(AutoIncrement, { inc_field: 'class_id' });
export default mongoose.model("classes", ClassSchema);