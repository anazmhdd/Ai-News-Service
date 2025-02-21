import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

// Parse the FIREBASE_SERVICE_ACCOUNT from .env
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Admin Initialized Successfully!");
