import mongoose, { Schema } from "mongoose";

const DailyStatSchema: Schema = new Schema(
    {
        completed: Number,
        goal: Number,
        focusScore: Number,
        morningHours: Number,
        eveningHours: Number
    },{
            timestamps: true,
    }
);

const DailyStat = mongoose.models.DailyStat|| mongoose.model("DailyStat", DailyStatSchema);

export default DailyStat;
