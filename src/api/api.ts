import store from '@/store'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  Firestore,
  CollectionReference,
  DocumentData,
  DocumentReference,
  where,
  query,
  Query,
  WhereFilterOp,
  onSnapshot,
} from 'firebase/firestore'

export async function queryApi(
  col: string,
  queryData: {
    where: string
    operator: WhereFilterOp
    value: string
  },
  storeLocation: string
) {
  const db: Firestore = getFirestore()
  const colref: CollectionReference<DocumentData> = collection(db, col)

  store.commit('setLoadingValue', true)

  const matchingQuery: Query<DocumentData> = query(
    colref,
    where(queryData.where, queryData.operator, queryData.value)
  )

  onSnapshot(matchingQuery, (snapshot) => {
    if (snapshot && snapshot?.docs.length > 0) {
      snapshot.docs.forEach((doc) => {
        store.commit(
          storeLocation,
          'id' in doc.data() ? doc.data() : { id: doc.id, ...doc.data() }
        )
      })
    } else {
      store.commit(storeLocation, null)
    }
  })

  store.commit('setLoadingValue', false)

  return true
}

export default async function api(type: string, col: string, data?: any) {
  let res: any
  const db: Firestore = getFirestore()
  const colref: CollectionReference<DocumentData> = collection(db, col)

  store.commit('setLoadingValue', true)

  switch (type) {
    case 'GET':
      res = await getDocs(colref)
        .then((snapshot) =>
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        .catch((err) => ({ error: err }))
      break

    case 'POST':
      res = await addDoc(colref, data)
        .then(() => ({}))
        .catch((err) => ({ error: err }))
      break

    case 'DEL':
      const delRef: DocumentReference<DocumentData> = doc(db, col, data)
      res = await deleteDoc(delRef)
        .then(() => ({}))
        .catch((err) => ({ error: err }))
      break

    case 'PUT':
      const updRef: DocumentReference<DocumentData> = doc(db, col, data.id)
      res = await updateDoc(updRef, data)
        .then(() => ({}))
        .catch((err) => ({ error: err }))
      break
  }

  store.commit('setLoadingValue', false)

  return res
}
