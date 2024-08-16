import { connectToDB } from "@/libs/mongoDB";

import Parent from "../../../libs/models/Parent";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const parents = await Parent.find({}).populate("children");
        res.status(200).json({ success: true, data: parents });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "POST":
      try {
        const parent = await Parent.create(req.body);
        res.status(201).json({ success: true, data: parent });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
