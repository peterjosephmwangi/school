import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Reference to the associated class
    capacity: { type: Number, required: true }, // Maximum number of students in the section
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Section teacher
});

export default mongoose.models.Section || mongoose.model('Section', SectionSchema);
