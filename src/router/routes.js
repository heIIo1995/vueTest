//引入路由组件
import Home from '@/pages/Home/Index.vue'
import Search from '@/pages/Search/Index.vue'
import Login from '@/pages/Login/Index.vue'
import Register from '@/pages/Register/Index.vue'
import Detail from '@/pages/Detail/Index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import Trade from '@/pages/Trade/Index.vue'

export default [
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
    path: '/detail/:skuid',
    component: Detail,
    meta: { show: false },
    name: 'detail',
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true },
    name: 'addcartsuccess',
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true },
    name: 'shopcart',
  },
  {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    name: 'trade',
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
    meta: { show: true },
    name: 'register',
  },
]
