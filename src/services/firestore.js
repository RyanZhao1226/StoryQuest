import { db } from "../firebaseConfig.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

/** 
 * CRUD
**/

// Retrieve all stories
export async function getStories() {
  const colRef = collection(db, 'stories');
  const snapshot = await getDocs(colRef);
  const stories = snapshot.docs.map(docSnap => {
    return { id: docSnap.id, ...docSnap.data() };
  });
  return stories;
}

// Create a new story
export async function createStory(storyData) {
  const colRef = collection(db, 'stories');
  const docRef = await addDoc(colRef, storyData);
  return docRef.id;
}

// Update a story
export async function updateStory(storyId, updatedData) {
  const docRef = doc(db, 'stories', storyId);
  await updateDoc(docRef, updatedData);
}

// Delete a story
export async function deleteStory(storyId) {
  const docRef = doc(db, 'stories', storyId);
  await deleteDoc(docRef);
}

/**
 *  2. Progress Storage Example
**/

// Retrieve user progress
export async function getProgress() {
  const docRef = doc(db, 'progress', 'user');
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data();
  }
  return null;
}

// Save user progress
export async function saveProgress(progressData) {
  const docRef = doc(db, 'progress', 'user');
  await setDoc(docRef, progressData);
}