import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    sections: [{ type: String }], // List of sections within the class (e.g., A, B, C)
    groups: [{ type: String }], // List of groups within the class (e.g., Science, Commerce)
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }], // List of subjects for the class
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Class teacher
    studentCapacity: { type: Number, required: true }, // Maximum number of students in the class
});

export default mongoose.models.Class || mongoose.model('Class', ClassSchema);
