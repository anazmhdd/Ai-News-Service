import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js"; // ✅ Correct relative path

async function testFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "news"));
    querySnapshot.forEach((doc) => console.log(doc.id, "=>", doc.data()));
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
  }
}

testFirestore();
