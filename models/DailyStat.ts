import mongoose, { Schema } from "mongoose";

const DailyStatSchema: Schema = new Schema(
    {
        date: String,
        completed: Number,
        goal: Number,
        focusScore: Number,
        morningHours: Number,
        eveningHours: Number
    }
);

const DailyStat = mongoose.models.DailyStat|| mongoose.model("DailyStat", DailyStatSchema);

export default DailyStat;
