import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Administrator', 'Teacher', 'Student', 'Parent'], required: true },
    profileImage: { type: String, default: '' },
    // Add other fields as necessary, such as contact info, address, etc.
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
