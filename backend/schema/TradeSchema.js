import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);

const TradeSchema = mongoose.Schema({
    trade_id: { required: true, unique: true, type: Number },
    trade_name: { required: true, type: String },
    code: { required: true, type: String },
    instructor: { required: true, type: String },
    credits: {type: Number },
});

TradeSchema.plugin(AutoIncrement, { inc_field: 'subject_id' });
export default mongoose.model("subject", TradeSchema);
