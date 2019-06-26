<template>
  <div class="alertCenterModule">
    <titleModule width="100%" height="8%" title="事件处理" />
    <centerStart v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 5 || this.$store.state.eventAlert.planOrmanOrNoNumber == 2" />
    <planMan v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 0 || this.$store.state.eventAlert.planOrmanOrNoNumber == 1" />
    <continues v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 3" />
    <end v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 4" />
  </div>
</template>

<script>
import centerStart from "@/components/alertControl/centerStart"
import planMan from "@/components/alertControl/planMan"
import titleModule from "@/components/alertControl/titleModule"
import continues from "@/components/alertControl/continue"
import end from "@/components/alertControl/end"
export default {
  components: { centerStart, planMan, titleModule, continues, end }
}
</script>

<style lang="less" scoped>
  .alertCenterModule {
    width: 50%;
    height: 95%;
  }
</style>