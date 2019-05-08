import axios from 'axios'

// dev
// let base = '/learn/api'
// // build
let base = '/api'
export const AddTalk = params => {
  return axios.post(`${base}/testTalk`, params)
}
export const getUserTalk = params => {
  return axios.post(`${base}/userTalk`, params)
}

export const getAllTalk = params => {
  return axios.post(`${base}/userTalk`, params)
}
export const getTalkById = params => {
  return axios.get(`${base}/talkById`, { params: params })
}
