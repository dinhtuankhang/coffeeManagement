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
  apiKey: "AIzaSyCsWvQUmDddeTmSiFmEj1hnRR31AwtPGW8",
  authDomain: "iadatabase-a33d5.firebaseapp.com",
  projectId: "iadatabase-a33d5",
  storageBucket: "iadatabase-a33d5.appspot.com",
  messagingSenderId: "964284393725",
  appId: "1:964284393725:web:77cadb3734841b822cb694",
  measurementId: "G-914GRSWFG3"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);