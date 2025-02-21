// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0AzLBDQra5CKF2yjgHdbyXIRHQHkbmp0",
  authDomain: "ai-news-service-20290.firebaseapp.com",
  projectId: "ai-news-service-20290",
  storageBucket: "ai-news-service-20290.appspot.com",
  messagingSenderId: "231017218330",
  appId: "1:231017218330:web:898c779e8b3fd628146ca3",
  measurementId: "G-S8TV58S2YH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Optional: Initialize analytics only in the browser
let analytics;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export { analytics, auth, db, storage };
