import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/index.js'

//vuex模块化开发
//仓库存储数据
const state = {
  categoryDataList: [],
  bannerDataList: [],
  floorDataList: [],
}
//处理action 自定义业务逻辑
const actions = {
  //通过请求api获取分类列表数据
  async categoryList({ commit }) {
    let res = await reqCategoryList()
    if (res.code === 200) {
      //数据中多了一组数据使用slice截取掉
      commit('CategoryList', res.data.slice(0, 16))
    }
  },
  //获取首页轮播图
  async bannerList({ commit }) {
    let res = await reqBannerList()
    if (res.code === 200) {
      commit('BannerList', res.data)
    }
  },
  //获取Floor组件数据
  async floorList({ commit }) {
    let res = await reqFloorList()
    if (res.code === 200) {
      commit('FloorList', res.data)
    }
  },
}
//修改state
const mutations = {
  CategoryList(state, data) {
    state.categoryDataList = data
  },
  BannerList(state, data) {
    state.bannerDataList = data
  },
  FloorList(state, data) {
    state.floorDataList = data
  },
}
//计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
