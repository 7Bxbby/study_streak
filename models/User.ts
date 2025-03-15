import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema(
    {
        name: String,
        totalStudyHours: Number,
        streak:  Number,
        level:   Number,
        defaultGoal: Number
    }
);

const User = mongoose.models.User|| mongoose.model("User", UserSchema);

export default User;