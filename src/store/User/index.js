//登录与注册仓库

import {
  reqGetCode,
  reqRegister,
  reqLogin,
  reqGetUserInfo,
} from '@/api/index.js'

const state = {
  code: '',
  token: '',
  userInfo: {},
}

const mutations = {
  GetCode(state, code) {
    state.code = code
  },
  Login(state, token) {
    state.token = token
  },
  GetUserInfo(state, user) {
    state.userInfo = user
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
  //登录
  async login({ commit }, user) {
    let result = await reqLogin(user)
    if (result.code == '200') {
      commit('Login', result.data.token)
      return 'success'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  //根据token获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqGetUserInfo()
    if ((result.code = '200')) {
      commit('GetUserInfo', result.data)
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
