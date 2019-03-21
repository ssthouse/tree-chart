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

<script>
import SvgChart from './svg-chart'

export default {
  props: ['treeData'],
  name: 'svg-chart',
  data: function() {
    return {
      svgChart: null
    }
  },
  created() {
    this.svgChart = new SvgChart(this.treeData)
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

  .svg {
    width: 100%;
    height: 700px;
  }
}

.node {
  fill: grey;
}

.link {
  stroke-width: 2px;
  fill: transparent;
  stroke: blue;
}
</style>
