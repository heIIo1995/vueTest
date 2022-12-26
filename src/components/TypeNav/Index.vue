<template>
  <div class="type-nav">
    <div class="container" @mouseenter="showDetail" @mouseleave="hiddenDetail">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(lv_one,index) in categoryList"
              :key="lv_one.categoryId"
              :class="{cur:currentIndex===index}"
            >
              <h3 @mouseenter="changeIndex(index)" @mouseleave="changeIndex(-1)">
                <a
                  :data-categoryName="lv_one.categoryName"
                  :data-category1Id="lv_one.categoryId"
                >{{lv_one.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="lv_two in lv_one.categoryChild"
                  :key="lv_two.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="lv_two.categoryName"
                        :data-category2Id="lv_two.categoryId"
                      >{{lv_two.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="lv_three in lv_two.categoryChild" :key="lv_three.categoryId">
                        <a
                          :data-categoryName="lv_three.categoryName"
                          :data-category3Id="lv_three.categoryId"
                        >{{lv_three.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  //组件使用vuex
  import { mapState } from 'vuex'
  //按需引入lodash节流
  import throttle from 'lodash/throttle'
  export default {
    name: 'TypeNav',
    data() {
      return {
        currentIndex: -1,
        show: true
      }
    },
    methods: {
      //鼠标移入
      // changeIndex(index) {
      //   this.currentIndex = index
      // }
      //es5写法 节流
      changeIndex: throttle(function (index) {
        this.currentIndex = index
      }, 20),
      //跳转到search组件
      goSearch(event) {
        let { categoryname, category1id, category2id, category3id } = event.target.dataset
        if (categoryname) {
          let location = { name: 'search' }
          let query = { categoryName: categoryname }
          if (category1id) {
            //这样写为了ide不报警告
            //这样的写法也可以:query.category1Id = category1id
            query['category1Id'] = category1id
          } else if (category2id) {
            query['category2Id'] = category2id
          } else {
            query['category3Id'] = category3id
          }
          if (this.$route.params) {
            location['params'] = this.$route.params
            location['query'] = query
            this.$router.push(location)
          }
        }
      },
      showDetail() {
        if (this.$route.name === 'search') {
          this.show = true
        }
      },
      hiddenDetail() {
        if (this.$route.name === 'search') {
          this.show = false
        }
      }
    },
    mounted() {
      //跳转到search组件时隐藏联动列表
      if (this.$route.name === 'search') {
        this.show = false
      }
    },
    computed: {
      ...mapState({
        categoryList: state => state.home.categoryDataList
      })
    }
  }
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &:hover {
              .item-list {
                display: block;
              }
            }
          }
          .cur {
            background: #e1251b;
          }
        }
      }
      //过渡动画 进入
      .sort-enter {
        height: 0px;
      }
      ////过渡动画 结束
      .sort-enter-to {
        height: 461px;
      }
      ////过渡动画 时间&速率
      .sort-enter-active {
        transition: all 0.5s linear;
      }
    }
  }
</style>