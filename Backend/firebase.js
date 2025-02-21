import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
export const db = getFirestore(app);
