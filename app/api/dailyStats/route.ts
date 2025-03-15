import connectMongoDB from "@/libs/mongodb";
import DailyStat from "@/models/DailyStat";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {completed, goal, focusScore, morningHours, eveningHours} = await request.json();
    await connectMongoDB()
    await DailyStat.create({completed, goal, focusScore, morningHours, eveningHours})
    return NextResponse.json({message: "Successfully saved daily statistics"}, {status: 201});
}

export async function GET() {
    await connectMongoDB()
    const dailyStats = await DailyStat.find()
    return NextResponse.json({dailyStats}, {status: 200});
}