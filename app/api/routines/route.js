import { connectToDB } from "@/libs/mongoDB";

import Routine from "../../../libs/models/Routine";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "POST":
      try {
        const routine = await Routine.create(req.body);
        res.status(201).json({ success: true, data: routine });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
