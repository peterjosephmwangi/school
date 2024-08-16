import { connectToDB } from "@/libs/mongoDB";

import Grade from "../../../../libs/models/Grade";

export default async function handler(req, res) {
  const { method } = req;
  const { gradeId } = req.query;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const grade = await Grade.findById(gradeId);

        if (!grade) {
          return res
            .status(404)
            .json({ success: false, message: "Grade not found" });
        }

        res.status(200).json({ success: true, data: grade });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const updatedGrade = await Grade.findByIdAndUpdate(gradeId, req.body, {
          new: true,
          runValidators: true,
        });

        if (!updatedGrade) {
          return res
            .status(404)
            .json({ success: false, message: "Grade not found" });
        }

        res.status(200).json({ success: true, data: updatedGrade });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedGrade = await Grade.findByIdAndDelete(gradeId);

        if (!deletedGrade) {
          return res
            .status(404)
            .json({ success: false, message: "Grade not found" });
        }

        res
          .status(200)
          .json({ success: true, message: "Grade removed successfully" });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
