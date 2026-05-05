import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import path from 'path';
import dns from 'dns';
import { UserModel } from './src/DB/models/userModel.js';

// Fix for DNS resolution issues with MongoDB SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);


config({ path: path.resolve('./config/.env') });

async function seedAdmin() {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL not found in environment variables");
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoUrl);
        console.log("Connected to DB successfully.");

        const adminEmail = 'yussef.ali.it@gmail.com';
        const existingAdmin = await UserModel.findOne({ email: adminEmail });
        
        const salt = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 8;
        const hashedPassword = bcrypt.hashSync('Yussef@12345', salt);

        if (existingAdmin) {
            console.log(`Admin user ${adminEmail} already exists. Updating password and role...`);
            existingAdmin.password = hashedPassword;
            existingAdmin.role = 'admin';
            existingAdmin.isActive = true;
            await existingAdmin.save();
            console.log("Admin user updated successfully.");
        } else {
            console.log(`Creating new admin user: ${adminEmail}`);
            const newAdmin = new UserModel({
                userName: 'Admin Yussef',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                isActive: true
            });
            await newAdmin.save();
            console.log("Admin user seeded successfully.");
        }
    } catch (error) {
        console.error("Error seeding admin:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seedAdmin();

