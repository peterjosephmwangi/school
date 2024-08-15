import { connectToDB } from "@/libs/mongoDB";

import Teacher from '../../../../libs/models/Teacher';


export default async function handler(req, res) {
    const { method } = req;
    const { teacherId } = req.query;

    await connectToDB();

    switch (method) {
        case 'GET':
            try {
                const teacher = await Teacher.findById(teacherId);
                if (!teacher) {
                    return res.status(404).json({ success: false, message: 'Teacher not found' });
                }
                res.status(200).json({ success: true, data: teacher });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const teacher = await Teacher.findByIdAndUpdate(teacherId, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!teacher) {
                    return res.status(404).json({ success: false, message: 'Teacher not found' });
                }
                res.status(200).json({ success: true, data: teacher });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedTeacher = await Teacher.deleteOne({ _id: teacherId });
                if (!deletedTeacher) {
                    return res.status(404).json({ success: false, message: 'Teacher not found' });
                }
                res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
