import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    const projectSnapshot = await getDocs(collection(db, 'project'));
    const projects = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
