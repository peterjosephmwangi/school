import { connectToDB } from "@/libs/mongoDB";

import Attendance from "../../../../libs/models/Attendance";
export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const { studentId, classId, startDate, endDate } = req.query;
        const query = { student: studentId, class: classId };

        if (startDate || endDate) {
          query.date = {};
          if (startDate) query.date.$gte = new Date(startDate);
          if (endDate) query.date.$lte = new Date(endDate);
        }

        const totalDays = await Attendance.countDocuments(query);
        const presentDays = await Attendance.countDocuments({
          ...query,
          status: "Present",
        });

        const attendancePercentage =
          totalDays === 0 ? 0 : (presentDays / totalDays) * 100;

        res
          .status(200)
          .json({ success: true, percentage: attendancePercentage });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
