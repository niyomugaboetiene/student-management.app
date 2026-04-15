import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);

const TradeSchema = mongoose.Schema({
    trade_id: { unique: true, type: Number },
    trade_name: { required: true, type: String },
    code: { type: String },
    department: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "departments" }],
}, { timestamps: true });

TradeSchema.plugin(AutoIncrement, { inc_field: 'trade_id' });
export default mongoose.model("trades", TradeSchema);
