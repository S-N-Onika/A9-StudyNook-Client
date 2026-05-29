import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.AUTH_MONGODB_URI;

if (!mongoUri) {
    throw new Error("AUTH_MONGODB_URI is missing");
}

const client = new MongoClient(mongoUri);
const db = client.db();

const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),

    baseURL,

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },

    trustedOrigins: [
        "http://localhost:3000",
    
    ],
});