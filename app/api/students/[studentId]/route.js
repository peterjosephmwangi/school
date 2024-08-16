import { connectToDB } from "@/libs/mongoDB";

import Student from "../../../../libs/models/Student";

export default async function handler(req, res) {
  const { method } = req;
  const { studentId } = req.query;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const student = await Student.findById(studentId)
          .populate("class")
          .populate("section")
          .populate("group")
          .populate("parents");
        if (!student) {
          return res
            .status(404)
            .json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const student = await Student.findByIdAndUpdate(studentId, req.body, {
          new: true,
          runValidators: true,
        })
          .populate("class")
          .populate("section")
          .populate("group")
          .populate("parents");
        if (!student) {
          return res
            .status(404)
            .json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const student = await Student.findByIdAndDelete(studentId);
        if (!student) {
          return res
            .status(404)
            .json({ success: false, message: "Student not found" });
        }
        res
          .status(200)
          .json({ success: true, message: "Student deleted successfully" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
