<template>
<div></div>
</template>

<script>
import init from './canvas'
// import run from './origin.js'

export default {
  name: 'App',
  created () {
    init()
    // run()
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
