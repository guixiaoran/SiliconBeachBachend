import mongoose, { Schema } from "mongoose";

const comment = new Schema({
  serviceBelong: { type: String, trim: true, required: true },
  content: { type: String, trim: true, required: true },
  commentCreator: { type: String, trim: true, required: true },
  commentDate: { type: Date, default: Date.now },
});

export default mongoose.model("comment", comment);
