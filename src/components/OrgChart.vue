<template>
  <div id="org-chart-container">
    <div class="menu-container">
      <el-button @click="test(10)" style="margin: 20px;" :disabled="isDraw">Draw Small Company (10+ row)</el-button>
      <el-button @click="test(100)" style="margin: 20px;" :disabled="isDraw">Draw Medium Company(100+ row)</el-button>
      <el-button @click="test(1000)" style="margin: 20px;" :disabled="isDraw">Draw Big Company(1000+ row)</el-button>
      <!--<el-button @click="testFold(1000, 100)" style="margin: 20px;" :disabled="isDraw">Draw Big Company(1000+ row & 100 below-->
        <!--folded)-->
      <!--</el-button>-->
      <el-row>
        <el-button @click="bigger()" style="margin: 20px;">+</el-button>
        <el-button @click="smaller()" style="margin: 20px;">-</el-button>
      </el-row>

      <el-card class="box-card">
        <div slot="header" class="action-title">
          <span>Support action</span>
        </div>
        <div v-for="action in supportActions" :key="action" class="action-item">
          {{'* ' + action}}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

import OrgChart from './org-chart'
import DataGenerator from '../base/data-generator'

export default {
  name: 'org-chart',
  data: function () {
    return {
      orgChart: null,
      isDraw: false,
      supportActions: ['click node to toggle', 'drag canvas', 'use mouse wheel to zoom', 'button control to zoom']
    }
  },
  mounted () {
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

<style scoped>
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

  .menu-container {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    vertical-align: top;
    width: 400px;
  }
  .action-title{
    font-size: 28px;
  }

  .action-item{
    font-size: 24px;
  }
</style>
