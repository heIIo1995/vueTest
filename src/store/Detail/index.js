import { reqGoodsInfo, reqAddOrModifyShopCart } from '@/api/index.js'
import { getUUID } from '@/utils/index.js'

//vuex模块化开发
//仓库存储数据
const state = {
  goodInfo: {},
  //生成模拟token
  uuid_token: getUUID(),
}
const mutations = {
  GetGoodInfo(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}
const actions = {
  //获取商品详细信息aciton
  async getGoodInfo({ commit }, skuid) {
    let result = await reqGoodsInfo(skuid)
    if (result.code == 200) {
      commit('GetGoodInfo', result.data)
    }
  },
  //将商品添加到购物车中
  async addOrModifyShopCart({ commit }, { skuid: skuid, skuCount: skuCount }) {
    let result = await reqAddOrModifyShopCart(skuid, skuCount)
    if (result.code == 200) {
      return 'success'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
}
const getters = {
  categoryView(state) {
    //异步获取 数据没返回前赋值空对象
    return state.goodInfo.categoryView || {}
  },
  //简化产品信息
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  //简化商品属性信息
  goodAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
