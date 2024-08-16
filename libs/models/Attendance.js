import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Excused"],
    required: true,
  },
});

AttendanceSchema.index({ student: 1, class: 1, date: 1 }, { unique: true }); // Ensure unique attendance per student per day

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);
