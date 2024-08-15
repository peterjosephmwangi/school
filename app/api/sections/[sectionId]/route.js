import { connectToDB } from "@/libs/mongoDB";

import Section from '../../../../libs/models/Section';
import Class from '../../../../libs/models/Class';


export default async function handler(req, res) {
    const { method } = req;
    const { sectionId } = req.query;

    await connectToDB();

    switch (method) {
        case 'GET':
            try {
                const section = await Section.findById(sectionId).populate('class').populate('teacher');
                if (!section) {
                    return res.status(404).json({ success: false, message: 'Section not found' });
                }
                res.status(200).json({ success: true, data: section });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const section = await Section.findByIdAndUpdate(sectionId, req.body, {
                    new: true,
                    runValidators: true,
                }).populate('class').populate('teacher');
                if (!section) {
                    return res.status(404).json({ success: false, message: 'Section not found' });
                }
                res.status(200).json({ success: true, data: section });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const section = await Section.findByIdAndDelete(sectionId);

                if (!section) {
                    return res.status(404).json({ success: false, message: 'Section not found' });
                }

                // Remove the section from the associated class
                await Class.findByIdAndUpdate(section.class, { $pull: { sections: section._id } });

                res.status(200).json({ success: true, message: 'Section deleted successfully' });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
