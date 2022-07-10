import mongoose, { Schema } from "mongoose";

const service = new Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  serviceCreator: { type: String, trim: true, required: true },
  cost: { type: String },
  private: { type: Boolean },
});

export default mongoose.model("service", service);
