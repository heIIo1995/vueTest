import { reqSearchInfo } from '@/api/index.js'

//vuex模块化开发
//仓库存储数据
const state = {
  searchList: {},
}
//修改state
const mutations = {
  GetSearchList(state, searchList) {
    state.searchList = searchList
  },
}
//处理action 自定义业务逻辑
const actions = {
  //通过请求api获取搜索结果数据
  async getSearchList({ commit }, params = {}) {
    let result = await reqSearchInfo(params)
    if (result.code == 200) {
      commit('GetSearchList', result.data)
    }
  },
}
//计算属性 简化数据
const getters = {
  //形参中的state是当前子仓库(search)中的state
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
