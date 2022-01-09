import store from '@/store';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, Firestore, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore"

export default async function api(type: string, col: string, data?: any) {
  let res: any;
  const db: Firestore = getFirestore();
  const colref: CollectionReference<DocumentData> = collection(db, col)

  store.commit('setLoading', true)

  switch (type) {
    case 'GET':
      res = await getDocs(colref).then(snapshot => snapshot.docs.map(doc =>
        ({ ...doc.data(), id: doc.id })
      )).catch(err => ({ error: err }))
      break;

    case "POST":
      res = await addDoc(colref, data).then(() => ({})).catch(err => ({ error: err }))
      break;

    case "DEL":
      const delRef: DocumentReference<DocumentData> = doc(db, col, data)
      res = await deleteDoc(delRef).then(() => ({})).catch(err => ({ error: err }))
      break;

    case "PUT":
      const updRef: DocumentReference<DocumentData> = doc(db, col, data.id)
      res = await updateDoc(updRef, data).then(() => ({})).catch(err => ({ error: err }))
      break;
  }

  store.commit('setLoading', false)

  return res;
}
