// import dbConnect from '../../../lib/dbConnect';
import Message from "@/libs/models/Message";

import { connectToDB } from "@/libs/mongoDB";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const { sender, receiver } = req.query;

        const messages = await Message.find({
          $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
          ],
        }).sort({ timestamp: 1 });

        res.status(200).json({ success: true, data: messages });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "POST":
      try {
        const { sender, receiver, content } = req.body;

        const newMessage = await Message.create({
          sender,
          receiver,
          content,
        });

        res.status(201).json({ success: true, data: newMessage });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
