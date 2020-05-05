<template>
  <div class="tree-container" ref="container">
    <svg
      class="svg vue-tree"
      ref="svg"
      :style="{
        transform: `translate(${initTransformX -
          config.nodeWidth / 2}px, ${initTransformY}px)`
      }"
    ></svg>

    <div
      class="dom-container"
      ref="domContainer"
      :style="{
        transform: `translate(${initTransformX -
          config.nodeWidth / 2}px, ${initTransformY}px)`
      }"
    >
      <transition-group name="tree-node-item" tag="div">
        <div
          class="node-slot"
          v-for="(node, index) of nodeDataList"
          @click="onClickNode(index)"
          :key="node.data._key"
          :style="{
            left: formatDimension(node.x),
            top: formatDimension(node.y),
            width: formatDimension(config.nodeWidth),
            height: formatDimension(config.nodeHeight)
          }"
        >
          <slot
            name="node"
            v-bind:node="node.data"
            v-bind:collapsed="node.data._collapsed"
          >
            <!-- 默认展示value字段 -->
            <span>{{ node.data.value }}</span>
          </slot>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

const DEFAULT_NODE_WIDTH = 100
const DEFAULT_NODE_HEIGHT = 100
const DEFAULT_LEVEL_HEIGHT = 200

const ANIMATION_DURATION = 800

function uuid() {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

export default {
  name: 'vue-tree',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          nodeWidth: DEFAULT_NODE_WIDTH,
          nodeHeight: DEFAULT_NODE_HEIGHT,
          levelHeight: DEFAULT_LEVEL_HEIGHT
        }
      }
    },
    // 展示的层级数据, 样例数据如: hierachical.json
    dataset: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      d3,
      colors: '568FE1',
      nodeDataList: [],
      linkDataList: [],
      initTransformX: 0,
      initTransformY: 0
    }
  },
  created() {
    this.addUniqueKey(this.dataset)
  },
  mounted() {
    this.init()
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
    init() {
      this.draw()
      this.enableDrag()
      this.initTransform()
    },
    initTransform() {
      const containerWidth = this.$refs.container.offsetWidth
      this.initTransformX = Math.floor(containerWidth / 2)
      this.initTransformY = Math.floor(this.config.nodeHeight)
    },
    // 使用扇形数据开始绘图
    draw() {
      const [nodeDataList, linkDataList] = this.buildTree(this.dataset)
      this.linkDataList = linkDataList
      this.svg = this.d3.select(this.$refs.svg)

      const self = this
      const links = this.svg.selectAll('.link').data(linkDataList)

      links
        .enter()
        .append('path')
        .style('opacity', 0)
        .transition()
        .duration(ANIMATION_DURATION)
        .style('opacity', 1)
        .attr('class', 'link')
        .attr('d', function(d, i) {
          let linkPath = self.d3
            .linkVertical()
            .x(function(d) {
              return d.x
            })
            .y(function(d) {
              return d.y
            })
            .source(function(d) {
              return { x: d.source.x, y: d.source.y }
            })
            .target(function() {
              return { x: d.target.x, y: d.target.y }
            })
          return linkPath(d)
        })
      links
        .transition()
        .duration(ANIMATION_DURATION)
        .attr('d', function(d, i) {
          let linkPath = self.d3
            .linkVertical()
            .x(function(d) {
              return d.x
            })
            .y(function(d) {
              return d.y
            })
            .source(function(d) {
              return { x: d.source.x, y: d.source.y }
            })
            .target(function() {
              return { x: d.target.x, y: d.target.y }
            })
          return linkPath(d)
        })

      links
        .exit()
        .transition()
        .duration(ANIMATION_DURATION)
        .style('opacity', 0)
        .remove()

      this.nodeDataList = nodeDataList
    },
    buildTree(rootNode) {
      const treeBuilder = this.d3
        .tree()
        .nodeSize([this.config.nodeWidth, this.config.levelHeight])
      const tree = treeBuilder(this.d3.hierarchy(rootNode))
      return [tree.descendants(), tree.links()]
    },
    enableDrag() {
      const svgElement = this.$refs.svg
      const container = this.$refs.container
      let startX = 0
      let startY = 0
      let isDrag = false
      // 保存鼠标点下时的位移
      let mouseDownTransform = ''
      container.onmousedown = event => {
        console.log(event)
        mouseDownTransform = svgElement.style.transform
        startX = event.clientX
        startY = event.clientY
        isDrag = true
      }
      container.onmousemove = event => {
        if (!isDrag) return
        const originTransform = mouseDownTransform
        let originOffsetX = 0
        let originOffsetY = 0
        if (originTransform) {
          const result = originTransform.match(/\((.*)\)/i)
          if (result !== null && result.length !== 0) {
            const [offsetX, offsetY] = result[1]
              .split(',')
              .map(this.parseDimensionNumber)
            originOffsetX = offsetX
            originOffsetY = offsetY
          }
        }
        const transformStr = `translate(${event.clientX -
          startX +
          originOffsetX}px, ${event.clientY - startY + originOffsetY}px)`
        // console.log('transformStr: '  + transformStr)
        svgElement.style.transform = transformStr
        this.$refs.domContainer.style.transform = transformStr
      }

      container.onmouseup = event => {
        startX = 0
        startY = 0
        isDrag = false
      }
    },
    onClickNode(index) {
      console.log(this.nodeDataList[index])
      const curNode = this.nodeDataList[index]
      if (curNode.data.children) {
        curNode.data._children = curNode.data.children
        curNode.data.children = null
        curNode.data._collapsed = true
      } else {
        curNode.data.children = curNode.data._children
        curNode.data._children = null
        curNode.data._collapsed = false
      }
      this.draw()
    },
    formatDimension(dimension) {
      if (typeof dimension === 'number') return `${dimension}px`
      if (dimension.indexOf('px') !== -1) {
        return dimension
      } else {
        return `${dimension}px`
      }
    },
    parseDimensionNumber(dimension) {
      if (typeof dimension === 'number') {
        return dimension
      }
      return parseInt(dimension.replace('px', ''))
    }
  },
  watch: {
    dataset() {
      this.draw()
    }
  }
}
</script>

<style lang="less">
.tree-container {
  .node {
    fill: grey !important;
  }

  .link {
    stroke-width: 2px !important;
    fill: transparent !important;
    stroke: #cecece !important;
  }
}
</style>

<style lang="less" scoped>
.tree-node-item-enter,
.tree-node-item-leave-to {
  transition-timing-function: ease-in-out;
  transition: transform 0.8s;
  opacity: 0;
}

.tree-node-item-enter-active,
.tree-node-item-leave-active {
  transition-timing-function: ease-in-out;
  transition: all 0.8s;
}

.tree-container {
  position: relative;
  overflow: hidden;

  .vue-tree {
    position: relative;
  }

  > svg,
  .dom-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible;
    transform: translate(50%, 0);
  }

  .dom-container {
    z-index: 1;
    // pointer-events: none;
  }
}

.node-slot {
  cursor: pointer;
  position: absolute;
  background-color: transparent;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  transition: all 0.8s;
  transition-timing-function: ease-in-out;
}
</style>
