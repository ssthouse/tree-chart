<template>
  <div id="main-menu">
    <v-btn color="info" :to="Cons.CANVAS_ORG_CHART">Canvas Chart</v-btn>
    <v-btn color="info" :to="Cons.SVG_ORG_CHART">Svg Chart</v-btn>
    <v-btn color="info" :to="Cons.JSON_VIEWER">JSON Viewer</v-btn>
  </div>
</template>
<script>
import * as Cons from '../router/constant'

export default {
  name: 'MainPage',
  data() {
    return {
      Cons
    }
  }
}
</script>
<style scoped>
</style>
