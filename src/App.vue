<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Organization Chart</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat href="https://github.com/ssthouse">
          <v-avatar size=42>
            <img src="https://avatars3.githubusercontent.com/u/10973821?s=460&v=4">
          </v-avatar>
          <span style="margin-left:8px;">About me</span>
        </v-btn>
        <v-btn flat href="https://github.com/ssthouse/organization-chart">
          <v-avatar size=42>
            <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png">
          </v-avatar>
          Source Code</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <router-view style="width: 100%; height: 100%;" />
  </v-app>
</template>

<script>
import OrgChart from './components/OrgChart.vue'

export default {
  name: 'App',
  components: { 'org-chart': OrgChart },
  data: function() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less">
</style>
