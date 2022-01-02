import store from '@/store';
import { set, ref, getDatabase, child, get, push, update } from 'firebase/database'

export default async function api(type: string, path: string, data?: any) {
  const db = getDatabase()
  store.commit('setLoading', true)

  let res;

  if (type === 'GET') {
    res = await get(child(ref(db), path)).then((result) => {
      if (result.exists())
        return result.val();
    }).catch((err) => err);
  }

  if (type === 'POST') {
    await set(push(ref(db, path)), data).catch(err => err)
  }

  // if (type === 'PUT') {
  //   await update(ref(db), { path: data });
  //   // res = await axios.put(`${import.meta.env.VITE_API_URL}${path}`, data).catch(err => err)
  // }

  // if (type === 'DEL') {
  //   res = await axios.delete(`${import.meta.env.VITE_API_URL}${path}`).catch(err => err)
  // }

  store.commit('setLoading', false)

  return res;

  // if (res) return res
  // else
  //   store.commit('setSnackbar', {
  //     color: 'red',
  //     text: `An error occured, please try again.`,
  //     isVisible: true
  //   })

}
