<template>
  <div id="svg-chart-container">
    <div class="menu-container">
      <v-btn @click="start()" style="margin: 20px;">Start</v-btn>
      <v-btn @click="bigger()" style="margin: 20px;">+</v-btn>
      <v-btn @click="smaller()" style="margin: 20px;">-</v-btn>
    </div>

    <svg class="svg"></svg>
  </div>
</template>

<script lang="ts">
import SvgChart from './svg-chart'
import DataGenerator from '../base/data-generator'

export default {
  name: 'svg-chart',
  data: function() {
    return {
      svgChart: null
    }
  },
  created() {
    const data = DataGenerator.generateOrgChartData(10)
    this.svgChart = new SvgChart(data)
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      this.svgChart.drawTree()
    },
    bigger() {
      this.svgChart.bigger()
    },
    smaller() {
      this.svgChart.smaller()
    }
  }
}
</script>

<style lang="less">
#svg-chart-container {
  width: 100%;

  .node {
    fill: grey;
  }

  .link {
    stroke-width: 2px;
    stroke: blue;
  }

  .svg {
    width: 100%;
    height: 700px;
  }
}
</style>
