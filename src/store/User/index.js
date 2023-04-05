//登录与注册仓库

import { reqGetCode, reqRegister } from '@/api/index.js'

const state = {
  code: '',
}

const mutations = {
  GetCode(state, code) {
    state.code = code
  },
}

const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code == '200') {
      commit('GetCode', result.data)
    } else {
      return Promise.reject(new Error('验证码发送失败'))
    }
  },
  //注册
  async register({ commit }, user) {
    let result = await reqRegister(user)
    if (result.code == '200') {
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
