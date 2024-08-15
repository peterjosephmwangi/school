import { connectToDB } from "@/libs/mongoDB";

import User from '../../../libs/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    const { method } = req;

    await connectToDB();

    switch (method) {
        case 'GET':
            try {
                const users = await User.find({});
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const { name, email, password, role } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);

                const user = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    role,
                });

                res.status(201).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
