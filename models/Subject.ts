import mongoose, { Schema } from "mongoose";

const SubjectSchema: Schema = new Schema(
    {
        name: String,
        totalHours: Number,
    }
);

const Subject = mongoose.models.Subject|| mongoose.model("Subject", SubjectSchema);

export default Subject;
