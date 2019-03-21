<template>
  <div id="main-menu">
    <v-btn color="info" to="orgChart">Canvas Chart</v-btn>
    <v-btn color="info" to="svgChart">Svg Chart</v-btn>
    <v-btn color="info" to="jsonViewer">JSON Viewer</v-btn>
  </div>
</template>
<script>
export default {
  name: 'MainPage',
  data() {
    return {}
  }
}
</script>
<style scoped>
</style>
