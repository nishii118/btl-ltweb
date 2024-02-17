import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAdoHRFYap_ps-DQbZ1mmWZD7QL6KI_mGE",
  authDomain: "insta-clone-4da1b.firebaseapp.com",
  projectId: "insta-clone-4da1b",
  storageBucket: "insta-clone-4da1b.appspot.com",
  messagingSenderId: "507181473504",
  appId: "1:507181473504:web:48350bcb5861a5b14fba85",
  measurementId: "G-C2B8GWFDMN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

