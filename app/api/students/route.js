import { connectToDB } from "@/libs/mongoDB";

import Student from "../../../libs/models/Student";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const students = await Student.find({})
          .populate("class")
          .populate("section")
          .populate("group")
          .populate("parents");
        res.status(200).json({ success: true, data: students });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const {
          firstName,
          lastName,
          dateOfBirth,
          gender,
          address,
          email,
          phone,
          class: classId,
          section,
          group,
          parents,
          profilePicture,
        } = req.body;

        const student = await Student.create({
          firstName,
          lastName,
          dateOfBirth,
          gender,
          address,
          email,
          phone,
          class: classId,
          section,
          group,
          parents,
          profilePicture,
        });

        res.status(201).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
