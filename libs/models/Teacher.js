import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: '' },
    subjects: [{ type: String }], // Array of subjects taught by the teacher
    assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }], // Array of classes the teacher is assigned to
    contactInfo: {
        phone: { type: String, default: '' },
        address: { type: String, default: '' }
    },
    role: { type: String, default: 'Teacher' },
});

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
