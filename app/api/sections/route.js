import { connectToDB } from "@/libs/mongoDB";

import Section from '../../../libs/models/Section';
import Class from '../../../libs/models/Class';


export default async function handler(req, res) {
    const { method } = req;

    await connectToDB();

    switch (method) {
        case 'GET':
            try {
                const sections = await Section.find({}).populate('class').populate('teacher');
                res.status(200).json({ success: true, data: sections });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const { name, classId, capacity, teacher } = req.body;

                const section = await Section.create({
                    name,
                    class: classId,
                    capacity,
                    teacher,
                });

                // Update the class with the new section
                await Class.findByIdAndUpdate(classId, { $push: { sections: section._id } });

                res.status(201).json({ success: true, data: section });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
