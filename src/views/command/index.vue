<template>
  <div class="command lc">
    <Left />
    <!-- <Center /> -->
    <Right />
    <transition name="el-zoom-in-top">
      <newsAlert v-if="isNewsAlert"/>
      <tableAlert title="事件记录" v-if="this.$store.state.command.tableAlertValue == 1" />
      <tableAlert title="人员名单" v-if="this.$store.state.command.tableAlertValue == 2" />
      <tableAlert title="车辆名单" v-if="this.$store.state.command.tableAlertValue == 3" />
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
import newsAlert from "@/views/newsAlert/index"
import tableAlert from "@/components/command/alertTable"
export default {
  components: { Left, Center, Right, alertControl, newsAlert, lastOne, tableAlert },
  data() {
    return {
      isAlertBoolean: false,
      isNewsAlert: false,
      isTableAlert: null
    }
  },
  computed: {
    ...mapState({
      alertBoolean: state => state.eventAlert.alertBoolean,
      newsAlertBoolean: state => state.eventAlert.showNewsAlert
    })
  },
  watch: {
    alertBoolean(newVal, oldValue) {
      if (newVal != oldValue) {
        this.isAlertBoolean = newVal
      }
    },
    newsAlertBoolean(newVal, oldValue) {
      if (newVal != oldValue) {
        this.isNewsAlert = newVal
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
    pointer-events: none;
  }
</style>
