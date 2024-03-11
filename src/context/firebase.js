// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider} from "firebase/auth";

// import firebase from 'firebase/app';
import 'firebase/functions';
// import { getFunctions } from "firebase/functions";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,

};

// if (import.meta.env.VITE_REACT_APP_NODE_ENV === "development") {
//   connectFunctionsEmulator(getFunctions(app),"localhost",5001)
// }
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// Initialize Cloud Functions
// export const functions = firebase.functions();
// export const functions = getFunctions(app);

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const provider = new GoogleAuthProvider();
// const functions = getFunctions(app);

// export { app, auth, db, provider, functions };