import Vue from 'vue'
import * as d3 from 'd3'
import { DefaultOptions, GraphDirection, LinkStyle } from './VueTreeTypes'
export default Vue.extend({
  name: 'vue-tree',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    linkStyle: {
      type: String,
      default: LinkStyle.CURVE
    },
    direction: {
      type: String,
      default: GraphDirection.VERTICAL
    },
    // 展示的层级数据, 样例数据如: hierachical.json
    dataset: {
      type: Object,
      required: true
    }
  },
  computed: {
    configGetter() {
      return {
        ...DefaultOptions(),
        ...(this.config || {})
      }
    },
    initialTransformStyle() {
      return {
        transform: `scale(1) translate(${this.initTransformX}px, ${this.initTransformY}px)`,
        transformOrigin: 'center'
      }
    }
  },
  methods: {
    addUniqueKey(rootNode) {
      const queue = [rootNode]
      while (queue.length !== 0) {
        const node = queue.pop()
        node._key = uuid()
        if (node.children) {
          queue.push(...node.children)
        }
      }
      return rootNode
    },
    buildTree(rootNode) {
      const treeBuilder = d3
        .tree()
        .nodeSize([this.configGetter.nodeWidth, this.configGetter.levelHeight])
      const tree = treeBuilder(d3.hierarchy(rootNode))
      return [tree.descendants(), tree.links()]
    }
  },
  mounted() {}
})
//# sourceMappingURL=VueTree.js.map
