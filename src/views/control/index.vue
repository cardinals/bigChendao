<template>
  <div class="control lc">
    <Left />
    <!-- <Center /> -->
    <Right />
    <transition name="el-zoom-in-top">
      <alertControl v-if="isAlertBoolean" />
      <lastOne v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 6" />
      <alertMonitor v-if="this.$store.state.monitor.monitorBoolean" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Left from "./left";
import Center from "./center";
import Right from "./right"
import alertControl from "@/views/alertControl/index"
import alertMonitor from "@/views/alertMonitor/index"
import lastOne from "@/components/alertControl/lastOne"
export default {
  components: { Left, Center, Right, alertControl, lastOne, alertMonitor },
  data() {
    return {
      isAlertBoolean: false
    }
  },
  computed: {
    ...mapState({
      alertBoolean: state => state.eventAlert.alertBoolean
    })
  },
  watch: {
    alertBoolean(newVal, oldValue) {
      if (newVal != oldValue) {
        this.isAlertBoolean = newVal
      }
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
    pointer-events: none;
  }
</style>
