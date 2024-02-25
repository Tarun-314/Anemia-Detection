// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCDEy9UYm4uIyZnjqs_Mmt_L-eZFV8j18",
  authDomain: "anemia-detection-2e1c6.firebaseapp.com",
  projectId: "anemia-detection-2e1c6",
  storageBucket: "anemia-detection-2e1c6.appspot.com",
  messagingSenderId: "377883422039",
  appId: "1:377883422039:web:c5ed1aa6bc61d09e1fa212",
  measurementId: "G-5TQD2X18YR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
