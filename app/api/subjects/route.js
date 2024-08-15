import { connectToDB } from "@/libs/mongoDB";

import Subject from '../../../libs/models/Subject';

export default async function handler(req, res) {
    const { method } = req;

    await connectToDB();

    switch (method) {
        case 'GET':
            try {
                const subjects = await Subject.find({}).populate('teacher').populate('classes');
                res.status(200).json({ success: true, data: subjects });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const { name, code, teacher, classes, description } = req.body;

                const subject = await Subject.create({
                    name,
                    code,
                    teacher,
                    classes,
                    description,
                });

                res.status(201).json({ success: true, data: subject });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
