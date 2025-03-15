import connectMongoDB from "@/libs/mongodb";
import Session from "@/models/Session";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {subject, duration, technique} = await request.json();
    await connectMongoDB()
    await Session.create({ subject, duration, technique })
    return NextResponse.json({message: "Successfully saved session"}, {status: 201});
}

export async function GET() {
    await connectMongoDB()
    const sessions = await Session.find()
    return NextResponse.json({sessions}, {status: 200});
}