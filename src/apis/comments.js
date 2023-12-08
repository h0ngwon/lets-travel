
import { query, collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseConfig';

export const fetchData = async () => {
    const initialComments = [];
    const q = query(collection(db, 'comments'));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        initialComments.push({ id: doc.id, ...doc.data() });
    });
    
    return initialComments;
};
