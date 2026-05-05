import mongoose from 'mongoose';
import dns from 'dns';

const MONGO_URL = 'mongodb+srv://technovaback:Technovaback@technova.8dw83vt.mongodb.net/technova?appName=technova';

dns.setServers(['8.8.8.8', '8.8.4.4']);

async function testConnection() {
    try {
        console.log("Testing connection to:", MONGO_URL);
        await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 5000 });
        console.log("SUCCESS: Connected to DB!");
        await mongoose.disconnect();
    } catch (err) {
        console.error("FAILURE: Could not connect to DB:", err.message);
        if (err.name === 'MongooseServerSelectionError') {
            console.error("Reason: Server selection timed out. This usually means the IP is not whitelisted or DNS is failing.");
        }
    }
}

testConnection();
