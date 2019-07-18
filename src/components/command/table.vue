<template>
  <div class="commandTable">
    <tableHeader />
    <tableContent />
    <tableFooter />
  </div>
</template>

<script>
import tableHeader from "./tableHeader"
import tableContent from "./tableContent"
import tableFooter from "./tableFooter"
export default {
  components: {
    tableHeader, tableContent, tableFooter
  }
}
</script>

<style lang="less" scoped>
  .commandTable {
    width: 92%;
    height: 85%;
    // background: olive;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>
