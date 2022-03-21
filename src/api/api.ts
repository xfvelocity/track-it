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
  }
) {
  const db: Firestore = getFirestore()
  const colref: CollectionReference<DocumentData> = collection(db, col)

  store.commit('setLoading', true)

  const matchingQuery: Query<DocumentData> = query(
    colref,
    where(queryData.where, queryData.operator, queryData.value)
  )

  // onSnapshot(matchingQuery, (doc) => {
  //   doc.forEach((x) => {
  //     console.log(x.data())
  //   })
  // })

  const res = await getDocs(matchingQuery)
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    )
    .catch((err) => ({ error: err }))

  store.commit('setLoading', false)

  return res
}

export default async function api(type: string, col: string, data?: any) {
  let res: any
  const db: Firestore = getFirestore()
  const colref: CollectionReference<DocumentData> = collection(db, col)

  store.commit('setLoading', true)

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

  store.commit('setLoading', false)

  return res
}
