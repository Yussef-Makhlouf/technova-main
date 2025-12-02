import { Schema, model } from "mongoose";



const ServiceSchema = new Schema(
  {
    // 🔥 NAME
    name_ar: { type: String, required: true },
    name_en: { type: String, required: true },

    features: [{
      feature_ar: String,
      feature_en: String
    }],

    // 🔥 SHORT DESCRIPTION
    shortDescription_ar: { type: String },
    shortDescription_en: { type: String },

    // 🔥 FULL DESCRIPTION
    description_ar: { type: String },
    description_en: { type: String },

    // IMAGES
    images: [
      {
        imageLink: { type: String, required: true },
        public_id: { type: String, required: true }
      }
    ],

    customId: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const serviceModel = model("Service", ServiceSchema);
