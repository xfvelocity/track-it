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
import { v4 as uuidv4 } from 'uuid'

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

  return results.docs.map((doc: any) => doc.data())
}

export const api = async (
  type: string,
  col: string,
  data?: any
): Promise<any> => {
  let res: any = []
  let error = false

  const userStore = useUserStore()
  const configStore = useConfigStore()

  const db = getFirestore()
  const ref = doc(db, col, userStore.user.uid)

  switch (type.toUpperCase()) {
    case 'GET':
      await getDoc(ref)
        .then((snapshot) => {
          res = snapshot.data()
        })
        .catch((err) => (error = err))

      break

    case 'POST':
      await getDoc(ref)
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            await updateDoc(ref, {
              data: arrayUnion({ uuid: uuidv4(), ...data }),
            })
          } else {
            await setDoc(doc(db, col, userStore.user.uid), { data: [data] })
          }

          res = true
        })
        .catch((err) => (error = err))

      break

    // case 'DEL':
    //   break
    // case 'PUT':
    //   break
  }

  if (error) {
    configStore.snackbar = {
      color: 'red',
      text: `An error occurred, please try again.`,
      isVisible: true,
    }

    return false
  } else {
    return res
  }
}
