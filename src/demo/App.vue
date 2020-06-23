<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Tree Chart</v-toolbar-title>
      <v-btn
        class="menu-item"
        :to="Cons.CANVAS_TREE"
        text
        style="margin-left: 32px;"
        :color="selectedMenu === 'canvas' ? 'info' : ''"
        >Canvas Chart</v-btn
      >
      <v-btn
        class="menu-item"
        :color="selectedMenu === 'svg' ? 'info' : ''"
        :to="Cons.SVG_TREE"
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
          <span style="margin-left: 8px;">About me</span>
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

export default {
  name: 'App',
  data() {
    return {
      Cons,
      selectedMenu: 'canvas'
    }
  },
  watch: {
    $route() {
      this.updateSelectedMenu()
    }
  },
  created() {
    this.updateSelectedMenu()
  },
  methods: {
    backtoMenu() {
      this.$router.push('main')
    },
    updateSelectedMenu() {
      if (this.$route.path === `/${Cons.CANVAS_TREE}`) {
        this.selectedMenu = 'canvas'
      } else {
        this.selectedMenu = 'svg'
      }
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
