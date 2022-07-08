import { useConfigStore } from '@/stores/config'
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
  QuerySnapshot,
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

  const matchingQuery: Query<DocumentData> = query(
    colref,
    where(queryData.where, queryData.operator, queryData.value)
  )
  const results: QuerySnapshot<DocumentData> = await getDocs(matchingQuery)

  return results.docs.map((doc: any) =>
    'id' in doc.data() ? doc.data() : { id: doc.id, ...doc.data() }
  )
}

export default async function api(type: string, col: string, data?: any) {
  let res: any = null
  let error: boolean = false
  const configStore = useConfigStore()
  const db: Firestore = getFirestore()
  const colref: CollectionReference<DocumentData> = collection(db, col)

  switch (type.toUpperCase()) {
    case 'GET':
      res = await getDocs(colref)
        .then((snapshot) =>
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        .catch(() => {
          error = true
        })
      break

    case 'POST':
      res = await addDoc(colref, data)
        .then(() => true)
        .catch(() => {
          error = true
        })
      break

    case 'DEL':
      const delRef: DocumentReference<DocumentData> = doc(db, col, data)
      res = await deleteDoc(delRef)
        .then(() => true)
        .catch(() => {
          error = true
        })
      break

    case 'PUT':
      const updRef: DocumentReference<DocumentData> = doc(db, col, data.id)
      res = await updateDoc(updRef, data)
        .then(() => true)
        .catch(() => {
          error = true
        })
      break
  }

  if (error) {
    configStore.snackbar = {
      color: 'red',
      text: `An error occured, please try again.`,
      isVisible: true,
    }
  }

  return res
}
