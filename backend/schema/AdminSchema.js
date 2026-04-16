import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const AdminSchema = mongoose.Schema({
    admin_id: { unique: true, type: Number },
    full_name: { required: true, type: String },
    email: { required: true, unique: true, type: String },
    phone: { required: true, unique: true, type: String },
    location: { required: true, type: String },
    password: { type: String },
    last_login: { type: Date },
}, { timestamps: true });

AdminSchema.plugin(AutoIncrement, { inc_field: 'admin_id' });
export default mongoose.model("admin", AdminSchema);