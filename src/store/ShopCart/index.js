import {
  reqShopCartList,
  reqDeleteShop,
  reqModifyShopStatus,
} from '@/api/index.js'

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
  //删除购物车商品
  async deleteShop({ commit }, skuid) {
    let result = await reqDeleteShop(skuid)
    if (result.code == '200') {
      return 'success'
    } else {
      return Promise.reject(new Error('删除商品失败'))
    }
  },
  //修改商品状态
  async modifyShopStatus({ commit }, { skuid, status }) {
    console.log(skuid)
    console.log(status)
    let result = await reqModifyShopStatus(skuid, status)
    if (result.code == '200') {
      return 'success'
    } else {
      return Promise.reject(new Error('修改状态失败'))
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
