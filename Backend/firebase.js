import admin from "firebase-admin";
import serviceAccount from "./firebaseServiceAccount.json" assert { type: "json" };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ai-news-service-20290-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();
const auth = admin.auth();

export { auth, db };
