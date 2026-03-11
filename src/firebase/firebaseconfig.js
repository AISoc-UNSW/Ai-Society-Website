import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFlBTvq9ckH30fTGLDsmvufCwFTLkIViU",
  authDomain: "aisoc-events-admin.firebaseapp.com",
  projectId: "aisoc-events-admin",
  storageBucket: "aisoc-events-admin.firebasestorage.app",
  messagingSenderId: "417922013940",
  appId: "1:417922013940:web:f705edc3d86c4af0ac9ca1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);