<template>
  <div>
    <router-view style="width: 100%"/>
    <!--<div class="bottom-nav-bar"></div>-->
  </div>
</template>

<script>
import OrgChart from './components/OrgChart'

export default {
  name: 'App',
  components: {'org-chart': OrgChart},
  data: function () {
    return {}
  },
  created () {
    this.$router.push('OrgChart')
  },
  methods: {}
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

  body,div {
    margin: 0;
    padding: 0;
    text-align: center;
  }
</style>
