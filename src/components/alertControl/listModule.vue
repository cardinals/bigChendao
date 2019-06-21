<template>
  <div 
    :class="position == 'bottom' ? 'listModule1' : 'listModule'" 
    :style="{ backgroundImage: option.back }">
      <div 
        class="title"
        :style="{ backgroundImage: option.titleBack, top: titleTop, left: titleLeft }">
        {{ option.title }}
      </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    },
    position: {
      type: String,
      default: 'top'
    },
    titleTop: {
      type: String,
      default: '0'
    },
    titleLeft: {
      type: String,
      default: '3%'
    }
  }
};
</script>

<style lang="less" scoped>
.listModule {
  width: 100%;
  height: 51%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
}
.listModule1 {
  width: 100%;
  height: 51%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0;
}
.title {
  width: 40%;
  height: 10%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 4%;
}
</style>
