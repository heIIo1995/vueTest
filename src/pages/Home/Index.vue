<template>
  <div>
    <!-- 三级联动组件(全局组件) -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- 给子组件传值 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
  //引入轮播图组件
  import ListContainer from '@/pages/Home/ListContainer/Index.vue'
  //引入今日推荐组件
  import Recommend from '@/pages/Home/Recommend/Index.vue'
  //引入排行榜组件
  import Rank from '@/pages/Home/Rank/Index.vue'
  //引入猜你喜欢组件
  import Like from '@/pages/Home/Like/Index.vue'
  //引入楼层组件
  import Floor from '@/pages/Home/Floor/Index.vue'
  //引入商标组件
  import Brand from '@/pages/Home/Brand/Index.vue'
  //引入vuex
  import { mapState } from 'vuex'
  export default {
    name: 'Home',
    components: {
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted() {
      //派发action 请求floor组件数据
      this.$store.dispatch('floorList')
    },
    computed: {
      ...mapState({
        floorList: state => state.home.floorDataList
      })
    }
  }
</script>