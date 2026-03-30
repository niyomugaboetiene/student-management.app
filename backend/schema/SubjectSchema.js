import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence"

const AutoIncrement = AutoIncrementFactory(mongoose);

const SubjectSchema = mongoose.Schema({
    subject_id: { required: true, unique: true, type: Number },
    subject_name: { required: true, type: String },
    code: { required: true, type: String },
    instructor: { required: true, type: String },
    students: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    credits: {type: Number },
}, { timestamp: true});

SubjectSchema.plugin(AutoIncrement, { inc_field: 'subject_id' });
export default mongoose.model("subject", SubjectSchema);

// https://www.figma.com/design/xdsivDGz4yOY8mjdnAfH8j/student-management-system--Community-?node-id=2-150&t=C1q1pmd5EEJWZHOR-0