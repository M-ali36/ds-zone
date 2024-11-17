import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyCVX5sO-Wr1X5I3sZ4FjTKrEcIVCbkvgE8",
  authDomain: "ds-zone.firebaseapp.com",
  projectId: "ds-zone",
  storageBucket: "ds-zone.appspot.com", // Corrected storage bucket name
  messagingSenderId: "400706789806",
  appId: "1:400706789806:web:71dbd9d88b9dca0802283f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { db, storage }; // Export storage as well
