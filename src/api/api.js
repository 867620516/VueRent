import axios from 'axios'

// dev
// let base = '/learn/api'
// // build
let base = '/api'
// 注册接口
export const ReginUser = params => {
  return axios.post(`${base}/regin`, params)
}
// 登录接口
export const LoginUser = params => {
  return axios.post(`${base}/login`, params)
}
// 判断用户是否被注册
export const hasReginedUser = params => {
  return axios.post(`${base}/hasregined`, params)
}

// 获取商品列表接口
export const GetProductList = params => {
  return axios.get(`${base}/rental`, { params: params })
}

// 获取查询商品接口
export const SearchProductList = params => {
  return axios.get(`${base}/search`, { params: params })
}

// 商品详情接口
export const GetProduct = params => {
  return axios.get(`${base}/product`, { params: params })
}

// 获取商品
export const GetProd = params => {
  return axios.get(`${base}/oneRental`, { params: params })
}

// 获取商品
export const GetProds = params => {
  return axios.get(`${base}/rental`, { params: params })
}
