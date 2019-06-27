<template>
  <div class="command lc">
    <Left />
    <Center />
    <Right />
    <transition name="el-zoom-in-top">
      <alertControl v-if="isAlertBoolean" />
      <lastOne v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 6" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Left from "./left";
import Center from "./center";
import Right from "./right"
import alertControl from "@/views/alertControl/index"
import lastOne from "@/components/alertControl/lastOne"
export default {
  components: { Left, Center, Right, alertControl, lastOne },
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
  .command {
    // background: red;
    position: absolute;
    width: 100%;
    height: 85.8%;
    top: 14.2%;
    padding-left: 1%;
    padding-right: 1%;
  }
</style>
