<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked==1"
              @change="modifyStatus(cartInfo,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum('minus',-1,cartInfo)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum('change',$event.target.value,cartInfo)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeNum('add',+1,cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuNum*cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShop(cartInfo)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          id="sck"
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked&&cartInfoList.length>0"
          @change="checkedAll"
        />
        <label for="sck">全选</label>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCheckedShop">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import throttle from 'lodash/throttle'
  export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    },
    methods: {
      //获取购物车列表数据
      getData() {
        this.$store.dispatch('getCartList');
      },
      //修改商品数量
      //type:区分动作
      //增加节流
      changeNum: throttle(async function (type, disNum, cart) {
        switch (type) {
          case 'add':
            disNum = 1
            break;
          case 'minus':
            if (cart.skuNum > 1) {
              disNum - 1
            } else {
              disNum = 0
            }
            disNum = cart.skuNum > 1 ? -1 : 0
            break;
          case 'change':
            //校验输入
            if (isNaN(disNum) || disNum < 1) {
              disNum = 0
            } else {
              disNum = parseInt(disNum) - cart.skuNum
            }
            break;
        }
        try {
          await this.$store.dispatch('addOrModifyShopCart', {
            skuid: cart.skuId,
            skuCount: disNum
          })
          this.getData()
        } catch (error) {
          console.log(error.message)
        }
      }, 500),
      //删除购物车商品
      async deleteShop(cart) {
        try {
          await this.$store.dispatch('deleteShop', cart.skuId)
          this.getData()
        } catch (error) {
          console.log(error.message)
        }
      },
      //修改商品状态
      modifyStatus: throttle(async function (cart, event) {
        try {
          let status = event.target.checked ? '1' : '0'
          await this.$store.dispatch('modifyShopStatus', { skuid: cart.skuId, status })
          this.getData()
        } catch (error) {
          console.log(error.message)
        }
      }, 1000),
      //批量删除选中商品
      async deleteCheckedShop() {
        try {
          await this.$store.dispatch('deleteCheckedShop')
          this.getData()
        } catch (error) {
          console.log(error.message)
        }
      },
      //全选/反选商品
      async checkedAll(event) {
        try {
          let checked = event.target.checked ? 1 : 0
          await this.$store.dispatch('checkedAll', checked)
          this.getData()
        } catch (error) {
          console.log(error.message)
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      cartInfoList() {
        return this.cartList.cartInfoList || []
      },
      //计算商品总价
      totalPrice() {
        let sum = 0
        this.cartInfoList.forEach(item => {
          if (item.isChecked == 1) {
            sum += item.skuNum * item.cartPrice
          }
        })
        return sum
      },
      //计算商品总数
      totalCount() {
        let count = 0
        this.cartInfoList.forEach(item => {
          if (item.isChecked == 1) {
            count += item.skuNum
          }
        })
        return count
      },
      //判断是否全选
      isAllChecked() {
        return this.cartInfoList.every(item => item.isChecked == 1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        & > div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;
        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          & > li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;
          }

          .cart-list-con5 {
            width: 16%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 11%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>