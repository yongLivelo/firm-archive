import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA1OEqP40DIKTn5xkIqt1eajwh0B6PoPIc",
  authDomain: "firm-archive-54957.firebaseapp.com",
  projectId: "firm-archive-54957",
  storageBucket: "firm-archive-54957.firebasestorage.app",
  messagingSenderId: "957892212578",
  appId: "1:957892212578:web:cf6207e6e1c45064c31e3b",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
