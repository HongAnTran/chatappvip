// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth ,connectAuthEmulator} from "firebase/auth";
import { getFirestore,connectFirestoreEmulator } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMkE9L2Mu1PCh5dfDQXejgZQI-BUCcA_s",
  authDomain: "chat-app-2-ca78a.firebaseapp.com",
  projectId: "chat-app-2-ca78a",
  storageBucket: "chat-app-2-ca78a.appspot.com",
  messagingSenderId: "81901785324",
  appId: "1:81901785324:web:2e828598a573fea29d15c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore()

// connectAuthEmulator(auth,"http://localhost:9099")
// if(window.location.hostname==="localhost"){

//   connectFirestoreEmulator(db, 'localhost', 8080);
// }
export {auth,db} 












