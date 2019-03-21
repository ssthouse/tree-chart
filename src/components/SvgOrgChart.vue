<template>
  <svg-chart v-bind:treeData="treeData"></svg-chart>
</template>

<script>
import SvgChart from './SvgChart.vue'

import * as DataGenerator from '../base/data-generator.ts'

const treeData = DataGenerator.generateOrgChartData(20)

export default {
  components: { 'svg-chart': SvgChart },
  data() {
    return {
      treeData
    }
  },
  created() {}
}
</script>

<style>
</style>
