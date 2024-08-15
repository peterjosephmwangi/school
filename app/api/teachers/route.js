import { connectToDB } from "@/libs/mongoDB";

import Teacher from '../../../libs/models/Teacher';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    const { method } = req;

    await connectToDB();

    switch (method) {
        case 'GET':
            try {
                const teachers = await Teacher.find({});
                res.status(200).json({ success: true, data: teachers });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const { name, email, password, subjects, assignedClasses, contactInfo } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);

                const teacher = await Teacher.create({
                    name,
                    email,
                    password: hashedPassword,
                    subjects,
                    assignedClasses,
                    contactInfo,
                });

                res.status(201).json({ success: true, data: teacher });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
