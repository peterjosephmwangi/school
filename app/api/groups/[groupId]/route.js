import { connectToDB } from "@/libs/mongoDB";

import Group from "../../../../libs/models/Group";
import Class from "../../../../libs/models/Class";

export default async function handler(req, res) {
  const { method } = req;
  const { groupId } = req.query;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const group = await Group.findById(groupId)
          .populate("class")
          .populate("teacher")
          .populate("students");
        if (!group) {
          return res
            .status(404)
            .json({ success: false, message: "Group not found" });
        }
        res.status(200).json({ success: true, data: group });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const group = await Group.findByIdAndUpdate(groupId, req.body, {
          new: true,
          runValidators: true,
        })
          .populate("class")
          .populate("teacher")
          .populate("students");
        if (!group) {
          return res
            .status(404)
            .json({ success: false, message: "Group not found" });
        }
        res.status(200).json({ success: true, data: group });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const group = await Group.findByIdAndDelete(groupId);

        if (!group) {
          return res
            .status(404)
            .json({ success: false, message: "Group not found" });
        }

        // Remove the group from the associated class
        await Class.findByIdAndUpdate(group.class, {
          $pull: { groups: group._id },
        });

        res
          .status(200)
          .json({ success: true, message: "Group deleted successfully" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
