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
