import { reqGetAddress, reqGetOrders } from '@/api/index.js'

const state = {
  address: [],
  orders: {},
}

const mutations = {
  GetAddress(state, address) {
    state.address = address
  },
  GetOrders(state, orders) {
    state.orders = orders
  },
}

const actions = {
  //获取用户地址
  async getAddress({ commit }) {
    let result = await reqGetAddress()
    if (result.code == '200') {
      commit('GetAddress', result.data)
      return 'success'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  //获取结算页面商品数据
  async getOrders({ commit }) {
    let result = await reqGetOrders()
    if (result.code == '200') {
      commit('GetOrders', result.data)
      return 'success'
    } else {
      return Promise.reject(new Error(result.message))
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
