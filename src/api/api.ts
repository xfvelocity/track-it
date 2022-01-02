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
    )).catch(err => err)
  }

  if (type === 'POST') {
    res = await addDoc(colref, data).then(() => ({})).catch(err => err)
  }

  if (type === 'DEL') {
    const docRef = doc(db, col, data)
    res = await deleteDoc(docRef).then(() => ({})).catch(err => err)
  }

  // if (type === 'PUT') {
  //   await update(ref(db), { path: data });
  //   // res = await axios.put(`${import.meta.env.VITE_API_URL}${path}`, data).catch(err => err)
  // }



  store.commit('setLoading', false)

  if (res) return res
  else
    store.commit('setSnackbar', {
      color: 'red',
      text: `An error occured, please try again.`,
      isVisible: true
    })

}
