//引入Vue和VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//解决使用push和replace编程式导航时重复导航到同一个路由控制台报错的问题
//详细信息:https://www.csdn.net/tags/MtTaEg1sNTk1MjIzLWJsb2cO0O0O.html
const originalReplace = VueRouter.prototype.replace
const originalPush = VueRouter.prototype.push
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err)
}
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

//引入路由组件
import Home from '@/pages/Home/Index.vue'
import Search from '@/pages/Search/Index.vue'
import Login from '@/pages/Login/Index.vue'
import Register from '@/pages/Register/Index.vue'
//配置路由
export default new VueRouter({
  routes: [
    //重定向或者默认路由都行
    // {
    //   path: '/',
    //   redirect: '/home',
    // },
    //添加路由源信息 控制组件显示/隐藏
    {
      path: '/',
      component: Home,
      meta: { show: true },
    },
    {
      path: '/home',
      component: Home,
      meta: { show: true },
      name: 'home',
    },
    {
      path: '/search/:keyword?',
      component: Search,
      meta: { show: true },
      name: 'search',
    },
    {
      path: '/login',
      component: Login,
      meta: { show: false },
      name: 'login',
    },
    {
      path: '/register',
      component: Register,
      meta: { show: false },
      name: 'register',
    },
  ],
})
