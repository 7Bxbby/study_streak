import connectMongoDB from "@/libs/mongodb";
import DailyStat from "@/models/DailyStat";
import {NextResponse} from "next/server";


interface Params {
    params: {
        id: string;
    };
}

export async function GET(request: Request, {params} : Params) {
    const {id} = params
    await connectMongoDB()
    const todayStats = await DailyStat.findOne({ _id: id })
    return NextResponse.json({todayStats}, {status: 200});
}