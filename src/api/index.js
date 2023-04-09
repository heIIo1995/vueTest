//统一管理api
import request from '@/api/request.js'
//轮播图假数据api
import mockRequest from '@/api/mockRequest.js'

//三级联动接口
export const reqCategoryList = () =>
  request({
    url: '/product/getBaseCategoryList',
    method: 'get',
  })

//轮播图模拟数据
export const reqBannerList = () =>
  mockRequest({
    url: '/banner',
    method: 'get',
  })

//floor组件数据
export const reqFloorList = () =>
  mockRequest({
    url: '/floor',
    method: 'get',
  })

//搜索组件数据 需要接收参数
export const reqSearchInfo = (params) =>
  request({
    url: '/list',
    method: 'post',
    data: params,
  })

//获取产品详情页数据
export const reqGoodsInfo = (skuid) =>
  request({
    url: `/item/${skuid}`,
    method: 'get',
    data: skuid,
  })

//将商品添加到购物车或者更新个数
export const reqAddOrModifyShopCart = (skuid, skuCount) =>
  request({
    url: `/cart/addToCart/${skuid}/${skuCount}`,
    method: 'post',
  })

//获取购物车列表数据
export const reqShopCartList = () =>
  request({
    url: '/cart/cartList',
    method: 'get',
  })

//删除购物车商品
export const reqDeleteShop = (skuid) =>
  request({
    url: `/cart/deleteCart/${skuid}`,
    method: 'delete',
  })

//修改商品状态
export const reqModifyShopStatus = (skuid, status) =>
  request({
    url: `/cart/checkCart/${skuid}/${status}`,
    method: 'get',
  })

//获取验证码
export const reqGetCode = (phone) =>
  request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
  })

//注册
export const reqRegister = (user) =>
  request({
    url: '/user/passport/register',
    data: user,
    method: 'post',
  })

//登录
export const reqLogin = (user) =>
  request({
    url: '/user/passport/login',
    data: user,
    method: 'post',
  })

//根据token获取用户信息
export const reqGetUserInfo = () =>
  request({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
  })

export const reqLoginOut = () =>
  request({
    url: 'user/passport/logout',
    method: 'get',
  })
