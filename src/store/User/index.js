//登录与注册仓库

import {
  reqGetCode,
  reqRegister,
  reqLogin,
  reqGetUserInfo,
  reqLoginOut,
} from '@/api/index.js'
import { setToken, getToken, removeToken } from '@/utils/token.js'

const state = {
  code: '',
  token: getToken(),
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
  LoginOut(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
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
      //持久化登录token
      setToken(result.data.token)
      return 'success'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  //根据token获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqGetUserInfo()
    if (result.code == '200') {
      commit('GetUserInfo', result.data)
      return 'success'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  //退出登录
  async loginOut({ commit }) {
    let result = await reqLoginOut()
    if (result.code == '200') {
      //actions中不能操作state
      commit('LoginOut')
      return 'success'
    } else {
      return Promise(new Error(result.message))
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
