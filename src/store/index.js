import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//模块化引入其他vuex仓库
import home from '@/store/Home/index.js'
import search from '@/store/Search/index.js'
import detail from '@/store/Detail/index.js'
import shopcart from '@/store/ShopCart/index.js'
import user from '@/store/User/index.js'

export default new Vuex.Store({
  //合并到大仓库
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
  },
})
