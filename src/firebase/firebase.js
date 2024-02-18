import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBF7nW_w7zyFenHrVBXUc-vNw0kZYcrrIc",
  authDomain: "insta-clone2-d4119.firebaseapp.com",
  projectId: "insta-clone2-d4119",
  storageBucket: "insta-clone2-d4119.appspot.com",
  messagingSenderId: "1009415397231",
  appId: "1:1009415397231:web:c21510f110d85e2ee1929a",
  measurementId: "G-F0WR27YDQY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
// firebase.firestore.enablePersistence();
export { app, auth, firestore, storage };

