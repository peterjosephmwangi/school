import { connectToDB } from "@/libs/mongoDB";

import Exam from "../../../libs/models/Exam";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const { classId, sectionId } = req.query;
        const query = {};

        if (classId) query.class = classId;
        if (sectionId) query.section = sectionId;

        const exams = await Exam.find(query)
          .populate("class")
          .populate("section")
          .populate("subjects")
          .populate("createdBy");

        res.status(200).json({ success: true, data: exams });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "POST":
      try {
        const {
          title,
          class: classId,
          section: sectionId,
          startDate,
          endDate,
          subjects,
          createdBy,
        } = req.body;

        const newExam = await Exam.create({
          title,
          class: classId,
          section: sectionId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          subjects,
          createdBy,
        });

        res.status(201).json({ success: true, data: newExam });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
