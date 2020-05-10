import Vue from 'vue'
import Router from 'vue-router'
import OrgChart from '../components/OrgChart.vue'
import VueTree from '../components/VueTreeDemo.vue'
import * as Cons from './constant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: Cons.CANVAS_ORG_CHART
    },
    {
      path: '/' + Cons.CANVAS_ORG_CHART,
      name: Cons.CANVAS_ORG_CHART,
      component: OrgChart
    },
    {
      path: '/' + Cons.SVG_ORG_CHART,
      name: Cons.SVG_ORG_CHART,
      component: VueTree
    }
  ]
})
