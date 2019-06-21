<template>
  <div class="control lc">
    <Left />
    <Center />
    <Right />
    <alertControl />
  </div>
</template>

<script>
import Left from "./left";
import Center from "./center";
import Right from "./right"
import alertControl from "@/views/alertControl/index"
export default {
  components: { Left, Center, Right, alertControl },
  data() {
    return {

    }
  }
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
