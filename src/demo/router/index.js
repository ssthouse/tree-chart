import Vue from 'vue'
import Router from 'vue-router'
import CanvasTree from '../../components/CanvasTree.vue'
import VueTree from '../../components/VueTreeDemo.vue'
import * as Cons from './constant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: Cons.CANVAS_TREE
    },
    {
      path: '/' + Cons.CANVAS_TREE,
      name: Cons.CANVAS_TREE,
      component: CanvasTree
    },
    {
      path: '/' + Cons.SVG_TREE,
      name: Cons.SVG_TREE,
      component: VueTree
    }
  ]
})
