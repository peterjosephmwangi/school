import { connectToDB } from "@/libs/mongoDB";

import Class from '../../../../libs/models/Class';

export default async function handler(req, res) {
    const { method } = req;
    const { classId } = req.query;

    await connectToDB();

    switch (method) {
        case 'GET':
            try {
                const classData = await Class.findById(classId)
                    .populate('subjects')
                    .populate('teacher');
                if (!classData) {
                    return res.status(404).json({ success: false, message: 'Class not found' });
                }
                res.status(200).json({ success: true, data: classData });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const classData = await Class.findByIdAndUpdate(classId, req.body, {
                    new: true,
                    runValidators: true,
                }).populate('subjects').populate('teacher');
                if (!classData) {
                    return res.status(404).json({ success: false, message: 'Class not found' });
                }
                res.status(200).json({ success: true, data: classData });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedClass = await Class.deleteOne({ _id: classId });
                if (!deletedClass) {
                    return res.status(404).json({ success: false, message: 'Class not found' });
                }
                res.status(200).json({ success: true, message: 'Class deleted successfully' });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
