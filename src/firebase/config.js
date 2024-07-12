// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfvi9c-U8BH6grOmfNS6MA26Nen2-icv8",
  authDomain: "reacttry2-fac90.firebaseapp.com",
  projectId: "reacttry2-fac90",
  storageBucket: "reacttry2-fac90.appspot.com",
  messagingSenderId: "271818566894",
  appId: "1:271818566894:web:ff1086f8c9bd1e7d8157ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}