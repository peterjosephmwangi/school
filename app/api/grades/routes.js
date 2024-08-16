import { connectToDB } from "@/libs/mongoDB";

import Grade from "../../../libs/models/Grade";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const grades = await Grade.find({});
        res.status(200).json({ success: true, data: grades });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "POST":
      try {
        const { grade, minMarks, maxMarks, gradePoint, remarks } = req.body;

        const newGrade = await Grade.create({
          grade,
          minMarks,
          maxMarks,
          gradePoint,
          remarks,
        });

        res.status(201).json({ success: true, data: newGrade });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
