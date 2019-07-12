<template>
  <div class="monitorRightCenter1">
    <div
      class="movie"
      v-for="(movie, index) in parts"
      :key="index"
      :style="movie"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      partValue: state => state.monitor.partValue
    })
  },
  watch: {
    partValue(val) {
      console.log(val, "点选值");
      if (val != "") {
        if (val == 1) {
          this.parts = this.parts1;
        } else if (val == 2) {
          this.parts = this.parts2;
        } else if (val == 3) {
          this.parts = this.parts3;
        } else if (val == 4) {
          this.parts = this.parts4;
        }
      }
    }
  },
  data() {
    return {
      parts: [{ width: "100%", height: "100%", background: "#d5ebf9" }],
      parts1: [{ width: "100%", height: "100%", background: "#d5ebf9" }],
      parts2: [
        { width: "47%", height: "46%", background: "yellow" },
        { width: "47%", height: "46%", background: "yellow" },
        { width: "47%", height: "46%", background: "yellow" },
        { width: "47%", height: "46%", background: "yellow" }
      ],
      parts3: [
        { width: "32%", height: "46%", background: "green" },
        { width: "32%", height: "46%", background: "green" },
        { width: "32%", height: "46%", background: "green" },
        { width: "32%", height: "46%", background: "green" },
        { width: "32%", height: "46%", background: "green" },
        { width: "32%", height: "46%", background: "green" }
      ],
      parts4: [
        { width: "32%", height: "30%", background: "red" },
        { width: "32%", height: "30%", background: "red" },
        { width: "32%", height: "30%", background: "red" },
        { width: "32%", height: "30%", background: "red" },
        { width: "32%", height: "30%", background: "red" },
        { width: "32%", height: "30%", background: "red" },
        { width: "32%", height: "30%", background: "red" },
        { width: "32%", height: "30%", background: "red" },
        { width: "32%", height: "30%", background: "red" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.monitorRightCenter1 {
  width: 90%;
  height: 66%;
  // background: cadetblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .movie {
    border-radius: 10px;
  }
}
</style>
