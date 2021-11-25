<template>
  <div id="org-chart-container">
    <div class="menu-container">
      <v-layout row>
        <v-btn @click="bigger()">+</v-btn>
        <v-btn @click="smaller()">-</v-btn>
      </v-layout>

      <v-card>
        <v-card-title>
          <div slot="header" class="action-title">
            <span>Support actions</span>
          </div>
          <div
            v-for="action in supportActions"
            :key="action"
            class="action-item"
          >
            {{ '* ' + action }}
          </div>
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import OrgChart from './org-chart'
import Vue from 'vue'
import { generateOrgChartData, Data } from '../base/data-generator'

export default Vue.extend({
  name: 'org-chart',
  data() {
    return {
      data: null,
      orgChart: null,
      supportActions: [
        'click node to toggle',
        'drag canvas',
        'use mouse wheel to zoom',
        'button control to zoom'
      ]
    }
  },
  created() {
    this.data = generateOrgChartData(10)
  },
  mounted() {
    this.orgChart = new OrgChart()
    this.orgChart.draw(this.data)
  },
  methods: {
    test() {
      this.orgChart.draw(this.data)
    },
    bigger() {
      this.orgChart.bigger()
    },
    smaller() {
      this.orgChart.smaller()
    }
  }
})
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
  height: 100%;
}

.menu-container {
  position: absolute;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 156px;
  display: flex;
  align-items: center;
  flex-direction: column;
  vertical-align: top;
  width: 400px;
  height: 100%;
  background-color: rgba(238, 237, 236, 0.5);
}
.action-title {
  font-size: 28px;
}

.action-item {
  font-size: 24px;
}
</style>
