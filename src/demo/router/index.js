import Vue from 'vue'
import Router from 'vue-router'
import CanvasTree from '../../components/CanvasTree.vue'
import VueTreeDemo from '../VueTreeDemo.vue'
import ReactTreeDemo from '../ReactTreeDemo.vue'
import * as Cons from './constant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: Cons.VUE_TREE
    },
    {
      path: '/' + Cons.CANVAS_TREE,
      name: Cons.CANVAS_TREE,
      component: CanvasTree
    },
    {
      path: '/' + Cons.VUE_TREE,
      name: Cons.SVG_TREE,
      component: VueTreeDemo
    },
    {
      path: '/' + Cons.REACT_TREE,
      name: Cons.REACT_TREE,
      component: ReactTreeDemo
    }
  ]
})
