<template>
  <div class="tableHeader">
    <div class="leftBox">
      <selects title="所有分组" :data="data1" />
      <selects title="所有事件状态" :data="data2"/>
    </div>
    <div class="rightBox">
      <searchs />
      <div class="btn cc">查询</div>
    </div>
  </div>
</template>

<script>
import selects from "./select"
import searchs from "./search"
export default {
  components: { selects, searchs },
  data() {
    return {
      data1: [{ name: '分组分组1' }, { name: '分组分组2' }, { name: '分组分组3' } ],
      data2: [{ name: '状态状态1' }, { name: '状态状态2' }, { name: '状态状态3' } ]
    }
  }
}
</script>

<style lang="less" scoped>
  .tableHeader {
    width: 100%;
    height: 6%;
    // background: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftBox {
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .rightBox {
      width: 22%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        width: 31%;
        height: 100%;
        background: #335a48;
        border-radius: 5px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
</style>
