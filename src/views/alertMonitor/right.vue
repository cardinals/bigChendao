<template>
  <div class="monitorRight">
    <top />
    <center :part="this.$store.state.monitor.partValue" />
    <bottom />
  </div>
</template>

<script>
import top from "@/components/alertMonitor/rightTop"
import center from "@/components/alertMonitor/rightCenter"
import bottom from "@/components/alertMonitor/rightBottom"
export default {
  components: {
    top, center, bottom
  }
}
</script>

<style lang="less" scoped>
  .monitorRight {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>
