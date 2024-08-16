import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // Optional if the class has groups
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parent" }],
  enrollmentDate: { type: Date, default: Date.now },
  profilePicture: { type: String }, // URL to the student's profile picture
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
