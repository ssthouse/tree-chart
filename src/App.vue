<template>
<div>
<button @click='load()'>click to load</button>
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
    load () {
      this.orgChart.drawCustom([1, 2, 13, 20, 23])
    },
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
</style>
