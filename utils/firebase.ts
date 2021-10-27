import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp, FirebaseOptions } from "firebase/app";

const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;

const config: FirebaseOptions = {
  appId,
  apiKey,
  projectId,
  authDomain,
  storageBucket,
  messagingSenderId,
};

export const app = initializeApp(config);
export const authentication = getAuth(app);
export const firestore = getFirestore(app);
