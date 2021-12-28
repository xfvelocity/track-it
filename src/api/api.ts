import store from '@/store';
import axios from 'axios'

export default async function api(type: string, path: string, data?: any) {
  store.commit('setLoading', true)

  let res;

  if (type === 'GET') {
    res = await axios.get(`${import.meta.env.VITE_API_URL}${path}`).catch(err => err)
  }

  if (type === 'POST') {
    res = await axios.post(`${import.meta.env.VITE_API_URL}${path}`, data).catch(err => err)
  }

  if (type === 'PUT') {
    res = await axios.put(`${import.meta.env.VITE_API_URL}${path}`, data).catch(err => err)
  }

  if (type === 'DEL') {
    res = await axios.delete(`${import.meta.env.VITE_API_URL}${path}`).catch(err => err)
  }

  store.commit('setLoading', false)

  if (res.data) return res.data
  else
    store.commit('setSnackbar', {
      color: 'red',
      text: `An error occured, please try again.`,
      isVisible: true
    })

}
