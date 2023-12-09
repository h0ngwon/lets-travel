import {
    query,
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
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

export const deleteData = async (id) => {
    await deleteDoc(doc(db, 'comments', id));
};

export const updateData = async ({ id, editText }) => {
    const commentRef = doc(db, 'comments', id);
    await updateDoc(commentRef, { contents: editText });
};
