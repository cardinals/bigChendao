<template>
  <div class="rangingBox">
    <div class="openBig">
      <div class="big"
        v-for="(item, index) in option.big"
        :key="index" :style="{ backgroundImage: item.back }">
      </div>
    </div>
    <div class="ranging">
      <div
        class="c"
        v-for="(item, index) in option.ranging"
        :key="index" :style="{ backgroundImage: item.back }">
          {{ item.name }}     
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        big: [
          { back: "url(" + require('../../assets/control/big.png') + ")" },
          { back: "url(" + require('../../assets/control/lit.png') + ")" }
        ],
        ranging: [
          { back: "url(" + require('../../assets/control/cj.png') + ")", name: '测距' },
          { back: "url(" + require('../../assets/control/cmj.png') + ')', name: '测面积' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .rangingBox {
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    width: 66%;
    height: 19%;
    // background: yellowgreen;
    margin-bottom: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    .openBig {
      height: 42%;
      width: 11%;
      // background: darkcyan;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .big {
        height: 43%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .ranging {
      width: 100%;
      height: 29%;
      // background: green;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .c {
        width: 46%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-size: 18px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding-bottom: 2%;
      }
    }
  }
</style>
