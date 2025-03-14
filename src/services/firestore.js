import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Fetch all stories from Firestore
export async function getStories() {
  const querySnapshot = await getDocs(collection(db, "stories"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
