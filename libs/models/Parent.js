import mongoose from "mongoose";

const ParentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  profilePicture: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

export default mongoose.models.Parent || mongoose.model("Parent", ParentSchema);
