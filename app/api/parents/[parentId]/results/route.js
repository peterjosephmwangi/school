// import dbConnect from '../../../lib/dbConnect';
import Result from ".@/libs/models/Result";
import Parent from ".@/libs/models/Parent";

import { connectToDB } from "@/libs/mongoDB";

export default async function handler(req, res) {
  const { method } = req;
  const { parentId } = req.query;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const parent = await Parent.findById(parentId).populate("children");
        if (!parent) {
          return res
            .status(404)
            .json({ success: false, message: "Parent not found" });
        }

        const results = await Result.find({
          student: { $in: parent.children.map((child) => child._id) },
        });

        res.status(200).json({ success: true, data: results });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
