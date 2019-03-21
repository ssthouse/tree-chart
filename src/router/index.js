import Vue from 'vue'
import Router from 'vue-router'
import OrgChart from '../components/OrgChart.vue'
import SvgChart from '../components/SvgChart.vue'
import MainPage from '../components/MainPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage
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
