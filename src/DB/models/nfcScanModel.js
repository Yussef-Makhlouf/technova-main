import mongoose from "mongoose";

/**
 * NFC Scan Model
 * 
 * This model connects to the existing 'nfcscans' collection
 * created by the Next.js frontend for NFC tracking.
 */
const nfcScanSchema = new mongoose.Schema(
    {
        ip: {
            type: String,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: false,
        },
        timestamp: {
            type: Date,
            default: Date.now,
            required: true,
        },
        tagId: {
            type: String,
            required: true,
            index: true,
        },
    },
    {
    timestamps: false,
    collection: 'nfcscans', // Use existing collection
    }
);

// Add compound index for analytics queries
nfcScanSchema.index({ tagId: 1, timestamp: -1 });

const NfcScan = mongoose.model("NfcScan", nfcScanSchema);

export default NfcScan;
