import { connectToDB } from "@/libs/mongoDB";

import Result from "../../../libs/models/Result";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const { studentId, examId, subjectId } = req.query;
        const query = {};

        if (studentId) query.student = studentId;
        if (examId) query.exam = examId;
        if (subjectId) query.subject = subjectId;

        const results = await Result.find(query)
          .populate("student")
          .populate("exam")
          .populate("subject");

        res.status(200).json({ success: true, data: results });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "POST":
      try {
        const {
          student,
          exam,
          subject,
          marksObtained,
          totalMarks,
          grade,
          remarks,
        } = req.body;

        const newResult = await Result.create({
          student,
          exam,
          subject,
          marksObtained,
          totalMarks,
          grade,
          remarks,
        });

        res.status(201).json({ success: true, data: newResult });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
