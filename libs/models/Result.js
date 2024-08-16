import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  grade: { type: String, required: true },
  remarks: { type: String },
});

ResultSchema.index({ student: 1, exam: 1, subject: 1 }, { unique: true }); // Ensure unique result per student per exam per subject

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);
