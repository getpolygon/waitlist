import { getFirestore } from "firebase/firestore";
import { initializeApp, FirebaseOptions } from "firebase/app";

const {
  FIREBASE_APP_ID: appId,
  FIREBASE_API_KEY: apiKey,
  FIREBASE_PROJECT_ID: projectId,
  FIREBASE_AUTH_DOMAIN: authDomain,
  FIREBASE_STORAGE_BUCKET: storageBucket,
  FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
} = process.env;

const config: FirebaseOptions = {
  appId,
  apiKey,
  projectId,
  authDomain,
  storageBucket,
  messagingSenderId,
};

export const app = initializeApp(config);
export const fst = getFirestore(app);
