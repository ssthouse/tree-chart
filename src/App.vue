<template>
  <div style="display: flex; align-items: center; flex-direction: column; vertical-align: top;">
    <button @click="test(10)" style="margin: 20px;" :disabled="isDraw">Draw Small Company (10+ row)</button>
    <button @click="test(100)" style="margin: 20px;" :disabled="isDraw">Draw Medium Company(100+ row)</button>
    <button @click="test(1000)" style="margin: 20px;" :disabled="isDraw">Draw Big Company(1000+ row)</button>
    <button @click="testFold(1000, 100)" style="margin: 20px;" :disabled="isDraw">Draw Big Company(1000+ row & 100 below folded)</button>
    <button @click="bigger()" style="margin: 20px;">+</button>
    <button @click="smaller()" style="margin: 20px;">-</button>
  </div>
</template>

<script>
import OrgChart from './org-chart'
import DataGenerator from './dao'
export default {
  name: 'App',
  data: function () {
    return {
      orgChart: null,
      isDraw: false
    }
  },
  created () {
    this.orgChart = new OrgChart()
  },
  methods: {
    test (depth) {
      let data = DataGenerator.generateOrgChartData(depth)
      this.orgChart.draw(data)
      this.isDraw = true
    },
    testFold (depth, foldDepth) {
      let data = DataGenerator.generateOrgChartDataFolded(depth, foldDepth)
      this.orgChart.draw(data)
      this.isDraw = true
    },
    bigger () {
      this.orgChart.bigger()
    },
    smaller () {
      this.orgChart.smaller()
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .orgChart {
    border: 1px solid black;
  }
</style>
