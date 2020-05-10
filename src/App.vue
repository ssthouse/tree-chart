<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Tree Chart</v-toolbar-title>
      <v-btn
        class="menu-item"
        :to="Cons.CANVAS_ORG_CHART"
        text
        style="margin-left: 32px;"
        :color="selectedMenu === 'canvas' ? 'info' : ''"
        >Canvas Chart</v-btn
      >
      <v-btn
        class="menu-item"
        :color="selectedMenu === 'svg' ? 'info' : ''"
        :to="Cons.SVG_ORG_CHART"
        text
        normal
        >Svg Chart</v-btn
      >
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat href="https://github.com/ssthouse">
          <v-avatar size="42">
            <img
              src="https://avatars3.githubusercontent.com/u/10973821?s=460&v=4"
            />
          </v-avatar>
          <span style="margin-left:8px;">About me</span>
        </v-btn>
        <v-btn flat href="https://github.com/ssthouse/organization-chart">
          <v-avatar size="42">
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            />
          </v-avatar>
          Source Code</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>

    <router-view style="width: 100%; height: 100%;" />
  </v-app>
</template>

<script>
import * as Cons from './router/constant'
import OrgChart from './components/OrgChart.vue'

export default {
  name: 'App',
  components: { 'org-chart': OrgChart },
  data: function() {
    return {
      Cons,
      selectedMenu: 'canvas'
    }
  },
  watch: {
    $route() {
      console.log(this.$route.path)
      if (this.$route.path === `/${Cons.CANVAS_ORG_CHART}`) {
        console.log('canvas')
        this.selectedMenu = 'canvas'
      } else {
        this.selectedMenu = 'svg'
        console.log('svg')
      }
    }
  },
  created() {
    console.log(this.$route.path)
  },
  methods: {
    backtoMenu() {
      this.$router.push('main')
    }
  }
}
</script>

<style lang="less" scoped>
.menu-item {
  display: inline-block;
  display: flex;
  height: 100%;
  margin: 0;
}
</style>
