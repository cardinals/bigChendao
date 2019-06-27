<template>
  <div class="echarts-container" ref="echart">

  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    options: Object
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.autoResize)
    this.destroy()
  },
  methods: {
    init () {
      if (this.options !== null) {
        this.setOption(this.options)
      }
      window.addEventListener('resize', this.autoResize)
    },
    createEchart () {
      this.destroy()
      this.chart = echarts.init(this.$refs.echart)
    },
    autoResize () {
      if (this.chart) {
        this.chart.resize()
      }
    },
    setOption (opt) {
      if (!this.chart) this.createEchart()
      this.chart.setOption(opt || {})
    },
    destroy () {
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
    }

  },
  watch: {
    options (opt) {
      this.setOption(opt)
    }
  }
}
</script>


<style lang="scss" scoped>
.echarts-container {
  width: 100%;
  height: 100%;
}
</style>
