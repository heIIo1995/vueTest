//引入Vue和VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由文件
import routes from './routes.js'
//使用插件
Vue.use(VueRouter)
//引入store
import store from '@/store/index.js'
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

//配置路由
let router = new VueRouter({
  routes,
  //配置切换到新路由的滚动行为 y:y轴
  scrollBehavior() {
    return { y: 0 }
  },
})

//全局路由前置守卫(路由跳转之前执行)
router.beforeEach(async (to, from, next) => {
  //to:要跳转的路由
  //from:从哪个路由跳转而来
  //next:放行操作
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //token已过期
          //清除token
          await store.dispatch('loginOut')
          next('/login')
        }
      }
    }
  } else {
    next()
  }
})

export default router
