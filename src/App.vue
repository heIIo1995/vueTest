<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!--使用路由源信息控制组件显示/隐藏-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
  import Header from './components/Header/Index.vue'
  import Footer from './components/Footer/Index.vue'
  export default {
    name: 'App',
    components: {
      Header,
      Footer
    },
    mounted() {
      //全局组件中获取数据在app根组件中请求 避免多个组件调用重复请求
      this.$store.dispatch('categoryList')
    },
  }
</script>

<style>
</style>
