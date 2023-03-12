import Vue from 'vue'
import App from './App.vue'
//引入三级联动组件(全局组件)
import TypeNav from '@/components/TypeNav/Index.vue'
//引入分页组件(全局组件)
import Pagination from '@/components/Pagination/Index.vue'

//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

//引入路由
import router from '@/router/index.js'

//引入Vuex store
import store from '@/store/index.js'

//引入MockServe.js 模拟数据
import '@/mock/mockServe.js'

//引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
new Vue({
  render: (h) => h(App),
  //全局事件总线配置
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  //注册路由
  router,
  //注册Vuex
  store,
}).$mount('#app')
