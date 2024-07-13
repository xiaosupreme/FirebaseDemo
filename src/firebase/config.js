import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfvi9c-U8BH6grOmfNS6MA26Nen2-icv8",
  authDomain: "reacttry2-fac90.firebaseapp.com",
  projectId: "reacttry2-fac90",
  storageBucket: "reacttry2-fac90.appspot.com",
  messagingSenderId: "271818566894",
  appId: "1:271818566894:web:ff1086f8c9bd1e7d8157ff"
};

  initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export {db, auth}