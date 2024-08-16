import { connectToDB } from "@/libs/mongoDB";

import Exam from "../../../../libs/models/Exam";

export default async function handler(req, res) {
  const { method } = req;
  const { examId } = req.query;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const exam = await Exam.findById(examId)
          .populate("class")
          .populate("section")
          .populate("subjects")
          .populate("createdBy");

        if (!exam) {
          return res
            .status(404)
            .json({ success: false, message: "Exam not found" });
        }

        res.status(200).json({ success: true, data: exam });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const updatedExam = await Exam.findByIdAndUpdate(examId, req.body, {
          new: true,
          runValidators: true,
        });

        if (!updatedExam) {
          return res
            .status(404)
            .json({ success: false, message: "Exam not found" });
        }

        res.status(200).json({ success: true, data: updatedExam });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedExam = await Exam.findByIdAndDelete(examId);

        if (!deletedExam) {
          return res
            .status(404)
            .json({ success: false, message: "Exam not found" });
        }

        res
          .status(200)
          .json({ success: true, message: "Exam removed successfully" });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
