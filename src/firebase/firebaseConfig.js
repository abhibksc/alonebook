// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAZtVpewu85FHwCQgRT4spwjWVCzyB5Fj0",
  authDomain: "social-media-6a985.firebaseapp.com",
  databaseURL: "https://social-media-6a985-default-rtdb.firebaseio.com",
  projectId: "social-media-6a985",
  storageBucket: "social-media-6a985.appspot.com",
  messagingSenderId: "934290390947",
  appId: "1:934290390947:web:38625b9913c477ef3ea416",
  measurementId: "G-6N38XQFGHE"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// const myCollection = collection(db, "myCollection");

// const unsubscribe = onSnapshot(myCollection, (snapshot) => {
//   snapshot.docs.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// }, (error) => {
//   console.error("Error fetching data: ", error);
// });