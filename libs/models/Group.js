import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true }, // Reference to the associated class
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // List of students in this group
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // Group teacher
});

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
