import mongoose from "mongoose";
import { ISession } from "../interface/Session.interface";

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const Session = mongoose.model<ISession>("Session", SessionSchema);

export default Session;
