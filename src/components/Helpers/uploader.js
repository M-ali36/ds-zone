import { storage, db } from '@db'; // Adjust imports based on your setup
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

// Function to upload an image to Firebase Storage and save the URL in Firestore
export const uploadImageAndSaveURL = async (file, collectionName, docId) => {
  try {
    // Step 1: Upload the image to Firebase Storage
    const storageRef = ref(storage, `${collectionName}/${docId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);

    // Step 2: Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Step 3: Save the image URL to Firestore
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, { imageUrl: downloadURL }, { merge: true });

    console.log('Image uploaded and URL saved to Firestore:', downloadURL);
  } catch (error) {
    console.error('Error uploading image and saving URL:', error);
  }
};
