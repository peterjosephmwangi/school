import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Reference to the teacher who teaches the subject
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }], // Reference to the classes where the subject is taught
    description: { type: String, default: '' },
});

export default mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);
