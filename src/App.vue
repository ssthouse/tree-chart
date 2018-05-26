<template>
  <div style="width: 100%: height:100%">
    <router-view style="width: 100%; height: 100%;" />
  </div>
</template>

<script>
import OrgChart from './components/OrgChart'

export default {
  name: 'App',
  components: { 'org-chart': OrgChart },
  data: function() {
    return {}
  },
  created() {},
  methods: {
    toSvgChart() {
      this.$router.push('/svgChart')
    }
  }
}
</script>

<style lang="less">
.bottom-nav-bar {
  position: fixed;
  bottom: 0;
  width: 90%;
  height: 48px;
  background-color: #58caff;
}

body,
div {
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
  height: 100%;
}

.fix-btn {
  position: fixed;
  left: 300px;
  top: 300px;
}
</style>
