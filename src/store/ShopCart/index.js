import { reqShopCartList } from '@/api/index.js'

//vuex模块化开发
//仓库存储数据
const state = {
  cartList: [],
}
const mutations = {
  getCartList(state, cartList) {
    state.cartList = cartList
  },
}
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqShopCartList()
    console.log(result)
    if (result.code == '200') {
      commit('GetCartList', result.data)
    }
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}
