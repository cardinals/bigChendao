<template>
  <div class="show">
    <navBar />
    <router-view />
  </div>
</template>

<script>
import navBar from "./navBar";
export default {
  name: "show",
  components: { navBar }
}
</script>

<style scoped lang="less">
  .show {
    width: 100%;
    height: 100%;
    pointer-events: none;
    // position: absolute;
    // top: 0;
    // left: 0;
  }
</style>
