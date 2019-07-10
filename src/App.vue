<template>
  <!-- <div id="app" :style="{ backgroundImage: back }"> -->
  <div id="app">
    <GISMAP v-if="this.$route.path == '/show/control' || this.$route.path == '/show/command'"/>
    <div class="routerView">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import GISMAP from "@/views/GISMAP/index"
export default {
  name: "app",
  components: { GISMAP },
  data() {
    return {
      back: "url(" + require("../static/img/control/d.png") + ")"
    };
  },
  mounted() {
    this.cale();
    window.addEventListener("resize", this.cale.bind(this));
  },
  methods: {
    cale() {
      const self = this;
      const html = document.getElementsByTagName("html")[0];
      const width = html.clientWidth || 1920;
      const height = html.clientHeight || 1080;
      const fontSize = 10 / 1920 * width;
      html.style.setProperty("--font-size", `${fontSize}px`);
      self.$store.dispatch("getClientSize", { width, height });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./assets/style/style.css";
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .routerView {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    pointer-events: none;
  }
}
</style>
