import { connectToDB } from "@/libs/mongoDB";
import Result from "../../../../libs/models/Result";

export default async function handler(req, res) {
  const { method } = req;
  const { resultId } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const result = await Result.findById(resultId)
          .populate("student")
          .populate("exam")
          .populate("subject");

        if (!result) {
          return res
            .status(404)
            .json({ success: false, message: "Result not found" });
        }

        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const updatedResult = await Result.findByIdAndUpdate(
          resultId,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!updatedResult) {
          return res
            .status(404)
            .json({ success: false, message: "Result not found" });
        }

        res.status(200).json({ success: true, data: updatedResult });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedResult = await Result.findByIdAndDelete(resultId);

        if (!deletedResult) {
          return res
            .status(404)
            .json({ success: false, message: "Result not found" });
        }

        res
          .status(200)
          .json({ success: true, message: "Result removed successfully" });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
