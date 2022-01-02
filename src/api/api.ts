import store from '@/store';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"

export default async function api(type: string, col: string, data?: any) {
  let res;
  const db = getFirestore();
  const colref = collection(db, col)

  store.commit('setLoading', true)

  if (type === 'GET') {
    res = await getDocs(colref).then(snapshot => snapshot.docs.map(doc =>
      ({ ...doc.data(), id: doc.id })
    )).catch(err => ({ error: err }))
  }

  if (type === 'POST') {
    res = await addDoc(colref, data).then(() => ({})).catch(err => ({ error: err }))
  }

  if (type === 'DEL') {
    const docRef = doc(db, col, data)
    res = await deleteDoc(docRef).then(() => ({})).catch(err => ({ error: err }))
  }

  if (type === 'PUT') { }

  store.commit('setLoading', false)

  return res;
}
