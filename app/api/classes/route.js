import { connectToDB } from "@/libs/mongoDB";

import Class from '../../../libs/models/Class';

export default async function handler(req, res) {
    const { method } = req;

    await connectToDB();

    switch (method) {
        case 'GET':
            try {
                const classes = await Class.find({})
                    .populate('subjects')
                    .populate('teacher');
                res.status(200).json({ success: true, data: classes });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const { name, sections, groups, subjects, teacher, studentCapacity } = req.body;

                const classData = await Class.create({
                    name,
                    sections,
                    groups,
                    subjects,
                    teacher,
                    studentCapacity,
                });

                res.status(201).json({ success: true, data: classData });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
