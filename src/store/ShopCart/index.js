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
    let result = await reqModifyShopStatus(skuid, status)
    if (result.code == '200') {
      return 'success'
    } else {
      return Promise.reject(new Error('修改状态失败'))
    }
  },
  //删除已勾选商品
  //context:本仓库上下文 可以在仓库中直接派发acitons
  deleteCheckedShop({ dispatch, getters }) {
    let shops = []
    //获取购物车中全部的商品
    getters.cartList.cartInfoList.forEach((item) => {
      let result = item.isChecked == 1 ? dispatch('deleteShop', item.skuId) : ''
      shops.push(result)
    })
    return Promise.all(shops)
  },
  //全线/反选商品勾选状态
  checkedAll({ dispatch, state }, status) {
    let shops = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let result = dispatch('modifyShopStatus', { skuid: item.skuId, status })
      shops.push(result)
    })
    return Promise.all(shops)
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
