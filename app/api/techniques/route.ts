import connectMongoDB from "@/libs/mongodb";
import Technique from "@/models/Technique";
import {NextResponse} from "next/server";


export async function GET() {
    await connectMongoDB()
    const techniques = await Technique.find()
    return NextResponse.json({techniques}, {status: 200});
}