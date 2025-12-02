import { model, Schema } from "mongoose";

const careerApplicationSchema = new Schema({
    careerId: {
        type: Schema.Types.ObjectId,
        ref: "Career",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    resumeUrl: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        default: ""
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const careerApplicationModel = model("CareerApplication", careerApplicationSchema);
