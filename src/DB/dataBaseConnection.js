import mongoose from "mongoose";
import { config } from 'dotenv'
import path from 'path'
import dns from 'dns';
import * as models from './models/index.js'; // Import all models to register schemas

// Fix for DNS resolution issues with MongoDB SRV records in some environments
dns.setServers(['8.8.8.8', '8.8.4.4']);


config({ path: path.resolve('./config/.env') })

export const db = mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to DB 📥 📤".green.bgBrightGreen.bold);
        // Models are already registered via the import above
    })
    .catch((err) => {
        console.error("Error connecting to database:".black.bgBrightRed, err);
    });