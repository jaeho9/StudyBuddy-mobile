import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
    apiKey: "AIzaSyBrUEYsx_Tta8jLluHjHWIlLnMts7MXuwE",
    authDomain: "studybuddy-1fbab.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://studybuddy.firebaseio.com",
    projectId: "studybuddy-1fbab",
    storageBucket: "studybuddy-1fbab.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "1:334171512812:ios:629afb6ce6ecbe7f7b2ac9",
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    measurementId: "G-MEASUREMENT_ID",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = getFirestore(app);