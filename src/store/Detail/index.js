import { reqGoodsInfo } from '@/api/index.js'

//vuex模块化开发
//仓库存储数据
const state = {
  goodInfo: {},
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
}
const getters = {
  categoryView(state) {
    //异步获取 数据没返回前赋值空对象
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
