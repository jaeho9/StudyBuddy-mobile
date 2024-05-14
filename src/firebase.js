// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLHsKNkqbxl4x-IRYvWlsUspzEqwG5qjA",
  authDomain: "studybuddy-b4d91.firebaseapp.com",
  projectId: "studybuddy-b4d91",
  storageBucket: "studybuddy-b4d91.appspot.com",
  messagingSenderId: "977483702908",
  appId: "1:977483702908:web:e4c61aaddf752f880e5ff9",
  measurementId: "G-N40JJ1YYR4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
