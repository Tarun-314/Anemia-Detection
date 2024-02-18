// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration, replace it with your project keys
const firebaseConfig = {
  apiKey: "AIzaSyCWj0icxKIqJh631dI6TuZEqQz_gTKK3BU",
  authDomain: "login-test-198b8.firebaseapp.com",
  projectId: "login-test-198b8",
  storageBucket: "login-test-198b8.appspot.com",
  messagingSenderId: "554386816129",
  appId: "1:554386816129:web:dd26e4a2e1e83b7a01a180",
  measurementId: "G-YYC29RFV3B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
