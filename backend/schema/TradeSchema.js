import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);

const TradeSchema = mongoose.Schema({
    trade_id: { required: true, unique: true, type: Number },
    trade_name: { required: true, type: String },
    code: { required: true, type: String },
    students: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    department: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "department" }],
    duration: { type: String }
}, { timestamps: true });

TradeSchema.plugin(AutoIncrement, { inc_field: 'subject_id' });
export default mongoose.model("subject", TradeSchema);
