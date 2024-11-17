import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract the file from the request
      const { file, fileName } = req.body;

      if (!file || !fileName) {
        return res.status(400).json({ message: 'File and fileName are required' });
      }

      // Create a unique reference for the file in Firebase Storage
      const storageRef = ref(storage, `uploads/${uuidv4()}-${fileName}`);
      
      // Convert base64 file data to Blob for upload
      const fileBlob = Buffer.from(file, 'base64');

      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, fileBlob);
      
      // Get the public URL for the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Send the download URL as the response
      res.status(200).json({ downloadURL });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
