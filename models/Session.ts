import mongoose, { Schema } from "mongoose";

const SessionSchema: Schema = new Schema(
    {
    subject: Number,
    duration: Number,
    technique: String,
    },
    {
        timestamps: true
    }
);

const Session = mongoose.models.Session|| mongoose.model("Session", SessionSchema);

export default Session;
