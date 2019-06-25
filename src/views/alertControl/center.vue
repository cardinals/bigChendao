<template>
  <div class="alertCenterModule">
    <titleModule width="100%" height="8%" title="事件处理" />
    <centerStart v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 3" />
    <transition name="el-fade-in-linear">
      <planMan v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 0 || this.$store.state.eventAlert.planOrmanOrNoNumber == 1" />
    </transition>
  </div>
</template>

<script>
import centerStart from "@/components/alertControl/centerStart"
import planMan from "@/components/alertControl/planMan"
import titleModule from "@/components/alertControl/titleModule"
export default {
  components: { centerStart, planMan, titleModule }
}
</script>

<style lang="less" scoped>
  .alertCenterModule {
    width: 50%;
    height: 95%;
  }
</style>