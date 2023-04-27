import { useConfigStore } from '@/stores/config'
import { useUserStore } from '@/stores/user'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  where,
  query,
  WhereFilterOp,
  setDoc,
  getDoc,
  arrayUnion,
} from 'firebase/firestore'

export const queryApi = async (
  col: string,
  queryData: {
    where: string
    operator: WhereFilterOp
    value: string
  }
) => {
  const db = getFirestore()
  const colref = collection(db, col)

  const matchingQuery = query(
    colref,
    where(queryData.where, queryData.operator, queryData.value)
  )

  const results = await getDocs(matchingQuery)

  return results.docs.map((doc: any) =>
    'id' in doc.data() ? doc.data() : { id: doc.id, ...doc.data() }
  )
}

export const queryRangeApi = async (
  col: string,
  queryOne: {
    where: string
    operator: WhereFilterOp
    value: string
  },
  queryTwo: {
    where: string
    operator: WhereFilterOp
    value: string
  }
) => {
  const db = getFirestore()
  const colref = collection(db, col)
  const matchingQuery = query(
    colref,
    where(queryOne.where, queryOne.operator, queryOne.value),
    where(queryTwo.where, queryTwo.operator, queryTwo.value)
  )

  const results = await getDocs(matchingQuery)

  return results.docs.map((doc: any) =>
    'id' in doc.data() ? doc.data() : { id: doc.id, ...doc.data() }
  )
}

export const api = async (type: string, col: string, data?: any) => {
  const userStore = useUserStore()
  const configStore = useConfigStore()

  const db = getFirestore()
  const colref = collection(db, col)

  switch (type.toUpperCase()) {
    case 'GET':
      const snapshot = await getDocs(colref)
      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    case 'POST':
      const ref = doc(db, col, userStore.user.uid)

      await getDoc(ref).then(async (snapshot) => {
        if (snapshot.exists()) {
          await updateDoc(ref, {
            data: arrayUnion(data),
          })
        } else {
          await setDoc(doc(db, col, userStore.user.uid), { data: [data] })
        }
      })

      return true

    case 'DEL':
      const delRef = doc(db, col, data)
      await deleteDoc(delRef)
      return true

    case 'PUT':
      const updRef = doc(db, col, data.id)
      await updateDoc(updRef, data)
      return true

    default:
      throw new Error('Invalid API type')
  }

  //   configStore.snackbar = {
  //     color: 'red',
  //     text: `An error occurred, please try again.`,
  //     isVisible: true,
  //   }
}
