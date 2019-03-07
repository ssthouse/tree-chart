import Vue from 'vue'
import Router from 'vue-router'
import OrgChart from '../components/OrgChart.vue'
import SvgChart from '../components/SvgChart.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/orgChart'
    },
    {
      path: '/orgChart',
      name: 'orgChart',
      component: OrgChart
    },
    {
      path: '/svgChart',
      name: 'svgChart',
      component: SvgChart
    }
  ]
})
