// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjhi6GenMvV0WYVCctEssTnD5M5gl3WyA",
    authDomain: "eccomerce-react-43575.firebaseapp.com",
    projectId: "eccomerce-react-43575",
    storageBucket: "eccomerce-react-43575.appspot.com",
    messagingSenderId: "533973031916",
    appId: "1:533973031916:web:b3e07afa166880d8487ec9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app);

export const db = getFirestore(app);
// console.log(db);