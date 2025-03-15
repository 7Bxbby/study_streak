import connectMongoDB from "@/libs/mongodb";
import Subject from "@/models/Subject";
import {NextResponse} from "next/server";

interface Params {
    params: {
        id: string;
    };
}

export async function PUT(request: Request, {params} : Params) {
    const {id} = params
    const {newTotalHours: totalHours} = await request.json()
    await connectMongoDB()
    await Subject.findByIdAndUpdate(id, {totalHours})
    return NextResponse.json({message: "Successfully updated subject total hours"}, {status: 201});
}