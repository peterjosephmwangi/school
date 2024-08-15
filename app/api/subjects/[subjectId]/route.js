import { connectToDB } from "@/libs/mongoDB";

import Subject from '../../../../libs/models/Subject';

export default async function handler(req, res) {
    const { method } = req;
    const { subjectId } = req.query;

    await connectToDB();

    switch (method) {
        case 'GET':
            try {
                const subject = await Subject.findById(subjectId).populate('teacher').populate('classes');
                if (!subject) {
                    return res.status(404).json({ success: false, message: 'Subject not found' });
                }
                res.status(200).json({ success: true, data: subject });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const subject = await Subject.findByIdAndUpdate(subjectId, req.body, {
                    new: true,
                    runValidators: true,
                }).populate('teacher').populate('classes');
                if (!subject) {
                    return res.status(404).json({ success: false, message: 'Subject not found' });
                }
                res.status(200).json({ success: true, data: subject });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedSubject = await Subject.deleteOne({ _id: subjectId });
                if (!deletedSubject) {
                    return res.status(404).json({ success: false, message: 'Subject not found' });
                }
                res.status(200).json({ success: true, message: 'Subject deleted successfully' });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
