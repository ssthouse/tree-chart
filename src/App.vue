<template>
  <div style="display: flex; align-items: center; flex-direction: column; vertical-align: top;">
    <button @click='test()'>text</button>
    <button @click='bigger()'>+</button>
    <button @click='smaller()'>-</button>
  </div>
</template>

<script>
import OrgChart from './canvas'
// import run from './origin.js'

export default {
  name: 'App',
  data: function () {
    return {
      orgChart: null
    }
  },
  created () {
    this.orgChart = new OrgChart()
    // run()
  },
  methods: {
    test () {
      this.orgChart.test()
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
