import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.42.153:3333/',
})
