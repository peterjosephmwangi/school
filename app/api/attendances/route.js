import { connectToDB } from "@/libs/mongoDB";

import Attendance from "../../../libs/models/Attendance";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const { studentId, classId, startDate, endDate } = req.query;
        const query = {};

        if (studentId) query.student = studentId;
        if (classId) query.class = classId;
        if (startDate || endDate) {
          query.date = {};
          if (startDate) query.date.$gte = new Date(startDate);
          if (endDate) query.date.$lte = new Date(endDate);
        }

        const attendanceRecords = await Attendance.find(query)
          .populate("student")
          .populate("class");

        res.status(200).json({ success: true, data: attendanceRecords });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const { student, class: classId, date, status } = req.body;

        const attendanceRecord = await Attendance.create({
          student,
          class: classId,
          date: new Date(date),
          status,
        });

        res.status(201).json({ success: true, data: attendanceRecord });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
