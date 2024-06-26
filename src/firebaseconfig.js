// ​‌‌‍⁡⁣⁣⁢𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝘁𝗼 𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲⁡​
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAss6OKJ-OXcXs1MZhWVjX1F4IX8wYj5S0",
  authDomain: "coffeemanagement-5dfc2.firebaseapp.com",
  projectId: "coffeemanagement-5dfc2",
  storageBucket: "coffeemanagement-5dfc2.appspot.com",
  messagingSenderId: "170444181107",
  appId: "1:170444181107:web:ef7aafb44a3711a5cb2406",
  measurementId: "G-PY0MSF0ZBP"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);