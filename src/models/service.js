import mongoose, { Schema } from "mongoose";

const service = new Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  // CreatorId: { type: String, trim: true, required: true },
  cost: { type: String },
});

export default mongoose.model("service", service);
