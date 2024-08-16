import { connectToDB } from "@/libs/mongoDB";

import Attendance from "../../../../libs/models/Attendance";

export default async function handler(req, res) {
  const { method } = req;
  const { attendanceId } = req.query;

  await connectToDB();

  switch (method) {
    case "PUT":
      try {
        const attendanceRecord = await Attendance.findByIdAndUpdate(
          attendanceId,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!attendanceRecord) {
          return res
            .status(404)
            .json({ success: false, message: "Attendance record not found" });
        }

        res.status(200).json({ success: true, data: attendanceRecord });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const attendanceRecord = await Attendance.findByIdAndDelete(
          attendanceId
        );

        if (!attendanceRecord) {
          return res
            .status(404)
            .json({ success: false, message: "Attendance record not found" });
        }

        res.status(200).json({
          success: true,
          message: "Attendance record deleted successfully",
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
