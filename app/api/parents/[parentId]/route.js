import { connectToDB } from "@/libs/mongoDB";

import Parent from "../../../../libs/models/Parent";

export default async function handler(req, res) {
  const { method } = req;
  const { parentId } = req.query;

  await connectToDB();

  switch (method) {
    case "PUT":
      try {
        const parent = await Parent.findByIdAndUpdate(parentId, req.body, {
          new: true,
          runValidators: true,
        });
        if (!parent) {
          return res
            .status(404)
            .json({ success: false, message: "Parent not found" });
        }
        res.status(200).json({ success: true, data: parent });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedParent = await Parent.findByIdAndDelete(parentId);
        if (!deletedParent) {
          return res
            .status(404)
            .json({ success: false, message: "Parent not found" });
        }
        res
          .status(200)
          .json({
            success: true,
            message: "Parent profile deleted successfully",
          });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
