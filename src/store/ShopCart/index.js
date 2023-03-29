import { reqShopCartList } from '@/api/index.js'

//vuex模块化开发
//仓库存储数据
const state = {
  cartList: [],
}
const mutations = {
  GetCartList(state, cartList) {
    state.cartList = cartList
  },
}
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqShopCartList()
    if (result.code == '200') {
      commit('GetCartList', result.data)
    }
  },
}
const getters = {
  cartList(state) {
    return state.cartList[0] || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
