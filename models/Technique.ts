import mongoose, { Schema } from "mongoose";

const TechniqueSchema: Schema = new Schema(
    {
        name: String,
        description: String,
    }
);

const Technique = mongoose.models.Technique|| mongoose.model("Technique", TechniqueSchema);

export default Technique;
