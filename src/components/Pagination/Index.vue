<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button
      v-if="startNumAndEndNum.start>1"
      @click="$emit('getPageNo',1)"
      :class="{active:pageNo==1}"
    >1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>
    <!--v-for和v-if一起使用冲突 v-for的优先级会高于v-if，因此v-if会重复运行在每个v-for中 将v-for用template标签进行包裹即可，因在该标签无特殊含义-->
    <template v-for="(page,index) in startNumAndEndNum.end">
      <button
        :key="index"
        v-if="page>=startNumAndEndNum.start"
        @click="$emit('getPageNo',page)"
        :disabled="pageNo==page"
        :class="{active:pageNo==page}"
      >{{page}}</button>
    </template>
    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button
      v-if="startNumAndEndNum.end<totalPage"
      @click="$emit('getPageNo',totalPage)"
    >{{totalPage}}</button>
    <button
      :disabled="pageNo==totalPage"
      @click="$emit('getPageNo',pageNo+1)"
      :class="{active:pageNo==totalPage}"
    >下一页</button>
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
      //总页数
      totalPage() {
        return Math.ceil(this.total / this.pageSize)
      },
      //页码起始位置和结束位置
      startNumAndEndNum() {
        const { continues, pageNo, totalPage } = this;
        let start = 0, end = 0;
        if (continues > totalPage) {
          start = 1;
          end = totalPage;
        } else {
          start = pageNo - parseInt(continues / 2);
          end = pageNo + parseInt(continues / 2);
          if (start < 1) {
            start = 1;
            end = continues;
          }
          if (end > totalPage) {
            start = totalPage - continues + 1;
            end = totalPage;
          }
        }
        return { start, end }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>