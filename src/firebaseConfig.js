// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZYnIl6yBE4urG8IOhA33qFON-H0TF8C4",
  authDomain: "storyquest-d29ee.firebaseapp.com",
  projectId: "storyquest-d29ee",
  storageBucket: "storyquest-d29ee.firebasestorage.app",
  messagingSenderId: "809857784528",
  appId: "1:809857784528:web:bdb11a8a321576be96dcd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };