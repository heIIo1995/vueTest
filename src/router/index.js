//引入Vue和VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由文件
import routes from './routes.js'
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

//配置路由
export default new VueRouter({
  routes,
  //配置切换到新路由的滚动行为 y:y轴
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  },
})
