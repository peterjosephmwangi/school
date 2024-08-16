import { connectToDB } from "@/libs/mongoDB";

import Group from '../../../libs/models/Group';
import Class from '../../../libs/models/Class';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const groups = await Group.find({})
          .populate("class")
          .populate("teacher")
          .populate("students");
        res.status(200).json({ success: true, data: groups });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { name, classId, students, teacher } = req.body;

        const group = await Group.create({
          name,
          class: classId,
          students,
          teacher,
        });

        // Update the class with the new group
        await Class.findByIdAndUpdate(classId, {
          $push: { groups: group._id },
        });

        res.status(201).json({ success: true, data: group });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
