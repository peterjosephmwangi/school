import { connectToDB } from "@/libs/mongoDB";
import Teacher from "../../../libs/models/Teacher";
import bcrypt from "bcryptjs";

export async function GET(request) {
  await connectToDB();

  try {
    const teachers = await Teacher.find({});
    return new Response(JSON.stringify({ success: true, data: teachers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  await connectToDB();

  try {
    const { name, email, password, subjects, assignedClasses, contactInfo } =
      await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      subjects,
      assignedClasses,
      contactInfo,
    });

    return new Response(JSON.stringify({ success: true, data: teacher }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
