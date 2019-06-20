<template>
  <div class="control lc">
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script>
import Left from "./left";
import Center from "./center";
import Right from "./right"
export default {
  data() {
    return {

    }
  },
  components: { Left, Center, Right}
}
</script>

<style scoped lang="less">
  .control {
    // background: red;
    position: absolute;
    width: 100%;
    height: 85.8%;
    top: 14.2%;
    padding-left: 1%;
    padding-right: 1%;
  }
</style>
