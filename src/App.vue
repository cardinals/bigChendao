<template>
  <div id="app" :style="{ backgroundImage: back }">
    <navBar v-if="$route.path == '/show'"/>
    <router-view></router-view>
  </div>
</template>

<script>

import navBar from "./views/show/navBar"
export default {
  name: "app",
  components: { navBar },
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

<style>
@import "./assets/style/style.css";
#app {
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
