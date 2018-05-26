<template>
  <div id="svg-chart-container">
    <div class="menu-container">
      <el-row>
        <el-button @click="start()" style="margin: 20px;">Start</el-button>
        <el-button @click="bigger()" style="margin: 20px;">+</el-button>
        <el-button @click="smaller()" style="margin: 20px;">-</el-button>
      </el-row>
    </div>

    <svg class="svg"></svg>
  </div>
</template>

<script>
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
    fill: transparent;
  }

  .svg {
    width: 100%;
    height: 700px;
  }
}
</style>
