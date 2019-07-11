<template>
  <div class="listContent" :style="{ width: width, height: height, position: position, top: top }">
    <div class="checkAll" v-if="isChecked">
      <input type="checkbox" name="" id="all">
      <label class="all" for="all">全选</label>
    </div>
    <div 
      class="everyOne" 
      v-for="(men, index) in data"
      :key="index" 
      :style="{ marginTop: margin, marginBottom: margin }">
      <input v-if="isChecked" type="checkbox" name="" :id="index">
      <p class="name ddd" :style="{ width: nameWidth }">
        <label :for="isChecked ? index: ''">{{ men.name }}</label>
      </p>
      <p class="tel" :style="{ width: telWidth }">
        <label :for="isChecked ? index: ''">{{ men.tel }}</label>
      </p>
      <p class="status1" v-if="isChecked && men.status == 0">
        <label :for="isChecked ? index: ''">正常</label>
      </p>
      <p class="status2" v-if="isChecked && men.status == 1">
        <label :for="isChecked ? index: ''">异常</label>
      </p>
    </div>
    <div class="gb" v-if="isChecked">开始广播</div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "79%"
    },
    width: {
      type: String,
      default: "64%"
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    nameWidth: {
      type: String,
      default: "32%"
    },
    telWidth: {
      type: String,
      default: "61%"
    },
    margin: {
      type: String,
      default: "8%"
    },
    position: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    tabEvent(index) { 
      this.defaultNum = index;
      this.$emit('propEvent', index);
    }
  }
};
</script>

<style lang="less" scoped>
// 超出滚动
.listContent::-webkit-scrollbar {
  display: none;
}
.listContent {
  // background: green;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  .checkAll {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 2%;
    width: 100%;
    .all {
      font-size: 16px;
      color: white;
      margin-bottom: 1%;
      margin-left: 3%;
    }
  }
  .everyOne {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-bottom: 8%;
    // margin-top: 8%;
    .name {
      font-size: 16px;
      color: white;
      // width: 32%;
    }
    .tel {
      font-size: 16px;
      color: white;
      // width: 61%;
    }
    .status1 {
      font-size: 16px;
      color: #2ed563;
    }
    .status2 {
      font-size: 16px;
      color: #ba1111;
    }
  }
  .gb {
    width: 46%;
    height: 13%;
    background: #63a9c4;
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin:  0 auto;
    cursor: pointer;
  }
}
</style>
