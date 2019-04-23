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

export const SearchMyList = params => {
  return axios.get(`${base}/searchMy`, { params: params })
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

// 获取用户发布的商品
export const GetUserProds = params => {
  return axios.get(`${base}/userRental`, { params: params })
}
// 添加一个商品
export const NewProd = params => {
  return axios.post(`${base}/newRental`, params)
}
// 获得user发布的租赁物品数量
export const GetRentalNum = params => {
  return axios.get(`${base}/getRentalNum`, { params: params })
}
// 获得当前用户粉丝数量
export const GetFollowerNum = params => {
  return axios.get(`${base}/getFollowerNum`, { params: params })
}
// 获得当前用户关注了多少人
export const GetFollowingNum = params => {
  return axios.get(`${base}/getFollowingNum`, { params: params })
}

// 获取七牛云上传token
export const GetQiniuUpToken = params => {
  return axios.get(`${base}/gettoken`, { params: params })
}

// 上传图片接口
export const UploadFile = params => {
  return axios({
    url: base + '/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
