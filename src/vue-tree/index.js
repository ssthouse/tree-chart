import Vue from 'vue'
import VueTree from './VueTree'

const Components = {
  'vue-tree': VueTree
}

Object.keys(Components).forEach(componentName => {
  Vue.component(name, Components[name])
})

export default Components
