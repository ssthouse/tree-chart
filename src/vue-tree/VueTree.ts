import Vue, { PropOptions } from 'vue'
import * as d3 from 'd3'
import {
  DefaultOptions,
  GraphDirection,
  LinkStyle,
  TreeNode,
  VueTreeConfig
} from './VueTreeTypes'
import { HierarchyPointNode, HierarchyNode, HierarchyPointLink } from 'd3'



export default Vue.extend({
  name: 'vue-tree',
  props: {
    config: {
      type: Object,
      default: () => ({})
    } as PropOptions<VueTreeConfig>,
    linkStyle: {
      type: String,
      default: LinkStyle.CURVE
    } as PropOptions<LinkStyle>,
    direction: {
      type: String,
      default: GraphDirection.VERTICAL
    } as PropOptions<GraphDirection>,
    // 展示的层级数据, 样例数据如: hierachical.json
    dataset: {
      type: Object,
      required: true
    } as PropOptions<TreeNode>
  },
  computed: {
    configGetter(): Required<VueTreeConfig> {
      return {
        ...DefaultOptions(),
        ...((this.config as VueTreeConfig) || {})
      }
    },
    initialTransformStyle(): Record<string, string> {
      return {
        transform: `scale(1) translate(${this.initTransformX}px, ${this.initTransformY}px)`,
        transformOrigin: 'center'
      }
    }
  },
  methods: {
    addUniqueKey(rootNode: TreeNode): TreeNode {
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
    buildTree(
      rootNode: TreeNode
    ): [
      Array<HierarchyPointNode<unknown>>,
      Array<HierarchyPointLink<unknown>>
    ] {
      const treeBuilder = d3
        .tree()
        .nodeSize([this.configGetter.nodeWidth, this.configGetter.levelHeight])
      const tree = treeBuilder(d3.hierarchy(rootNode))
      return [tree.descendants(), tree.links()]
    }
  },
  mounted() {}
})
