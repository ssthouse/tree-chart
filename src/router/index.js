import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/OrgChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/orgChart',
      name: 'orgChart',
      component: HelloWorld
    }
  ]
})
