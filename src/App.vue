<template>
  <div id="app">
    <new-locale-provider>
      <router-view />
    </new-locale-provider>
  </div>
</template>

<script>

import { newLocaleProvider } from "./components/antd"
export default {
  name: 'app',
  components: { newLocaleProvider },
  data() {
    return {};
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
      const fontSize = (16 / 1920) * width;
      html.style.setProperty("--font-size", `${fontSize}px`);
      self.$store.dispatch("getClientSize", { width, height });
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
