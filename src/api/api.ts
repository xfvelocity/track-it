import axios from 'axios'

export default async function api(type: string, path: string, data: any) {
  let res;

  if (type === 'GET') {
    res = await axios.get(`${import.meta.env.VITE_API_URL}${path}`)
  }

  if (type === 'POST') {
    res = await axios.post(`${import.meta.env.VITE_API_URL}${path}`, data)
  }

  if (res) {
    if (res.data) {

    }

    if (res.status !== 200) {

    }

    return res
  }
}
