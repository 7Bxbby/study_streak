import connectMongoDB from "@/libs/mongodb";
import Subject from "@/models/Subject";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {name, totalHours} = await request.json();
    await connectMongoDB()
    await Subject.create({ name, totalHours })
    return NextResponse.json({message: "Successfully created subject"}, {status: 201});
}

export async function GET() {
    await connectMongoDB()
    const subjects = await Subject.find()
    return NextResponse.json({subjects}, {status: 200});
}