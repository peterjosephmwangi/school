import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  subjects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
