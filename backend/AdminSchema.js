import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);


const AdminSchema = mongoose.Schema({
    admin_id: { required: true, unique: true, type: Number },
    full_name: { required: true, type: String },
    email: { required: true, unique: true, type: String },
    phone: { required: true, unique: true, type: String },
    location: { required: true, unique: true, type: String },
    joined_at: {type: Date, default: Date.now() },
    password: { type: String },
    last_login: { type: Date },
});

AdminSchema.plugin(AutoIncrement, { inc_field: 'admin_id' });
export default mongoose.model("student", StudentSchema);