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
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters,
}
