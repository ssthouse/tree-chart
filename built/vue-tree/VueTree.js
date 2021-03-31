import Vue from 'vue'
import * as d3 from 'd3'
import { DefaultOptions, TreeDrawDirection, LinkStyle } from './VueTree.types'
import {
  generateCurvedNodeLinksPath,
  generateStraightNodeLinksPath,
  treeBuilder
} from './TreeUtils'
const MATCH_TRANSLATE_REGEX = /translate\((-?\d+)px, ?(-?\d+)px\)/i
const MATCH_SCALE_REGEX = /scale\((\S*)\)/i
const ANIMATION_DURATION = 800
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
      default: TreeDrawDirection.VERTICAL
    },
    // 展示的层级数据, 样例数据如: hierachical.json
    dataset: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      TreeDrawDirection,
      colors: '568FE1',
      nodeDataList: [],
      linkDataList: [],
      initTransformX: 0,
      initTransformY: 0,
      currentScale: 1,
      currentTransform: {},
      // data properties to handle dragging
      isDragging: false,
      dragTransformMemory: {},
      dragStartX: 0,
      dragStartY: 0
    }
  },
  computed: {
    isVertical() {
      return this.direction === TreeDrawDirection.VERTICAL
    },
    configGetter() {
      return {
        ...DefaultOptions(),
        ...(this.config || {})
      }
    },
    datasetGetter() {
      return this.dataset
    },
    treeContainerElementRef() {
      return this.$refs.container
    },
    svgElementRef() {
      return this.$refs.svg
    },
    currentStyle() {
      return {
        transform: `scale(1) translate(${this.initTransformX}px, ${this.initTransformY}px)`,
        transformOrigin: 'center'
      }
    },
    transformX() {
      const containerWidth = this.treeContainer.offsetWidth
      if (this.isVertical()) {
        return Math.floor(containerWidth / 2)
      }
      return Math.floor(this.configGetter.nodeWidth)
    },
    transformY() {
      if (this.isVertical()) {
        return Math.floor(this.configGetter.nodeHeight)
      }
      const containerHeight = this.treeContainer.offsetHeight
      return Math.floor(containerHeight / 2)
    }
  },
  methods: {
    onMouseDown(event) {
      this.isDragging = true
      this.dragStartX = event.clientX
      this.dragStartY = event.clientY
      this.dragTransformMemory = { ...this.currentTransform }
    },
    onMouseMove(event) {
      if (!this.isDrag) {
        return
      }
      let newX =
        Math.floor((event.clientX - this.dragStartX) / this.currentScale) +
        this.dragTransformMemory.translateX
      let newY =
        Math.floor((event.clientY - this.dragStartY) / this.currentScale) +
        this.dragTransformMemory.translateY
      this.currentTransform.translateX = newX
      this.currentTransform.translateY = newY
    },
    onMouseUp() {
      this.dragStartX = 0
      this.dragStartY = 0
      this.isDragging = false
    },
    draw() {
      const [nodeDataList, linkDataList] = treeBuilder(
        this.datasetGetter,
        this.configGetter.nodeWidth,
        this.configGetter.levelHeight
      )
      this.linkDataList = linkDataList
      const d3SvgSelector = d3.select(this.svgElementRef)
      const self = this
      const links = d3SvgSelector.selectAll('.link').data(linkDataList, (d) => {
        return `${d.source.data._key}-${d.target.data._key}`
      })
      console.log(links)
      links
        .enter()
        .append('path')
        .style('opacity', 0)
        .transition()
        .duration(ANIMATION_DURATION)
        .ease(d3.easeCubicInOut)
        .style('opacity', 1)
        .attr('class', 'link')
        .attr('d', function (d, i) {
          return self.generateLinkPath(d)
        })
      links
        .transition()
        .duration(ANIMATION_DURATION)
        .ease(d3.easeCubicInOut)
        .attr('d', function (d) {
          return self.generateLinkPath(d)
        })
      links
        .exit()
        .transition()
        .duration(ANIMATION_DURATION / 2)
        .ease(d3.easeCubicInOut)
        .style('opacity', 0)
        .remove()
      this.nodeDataList = nodeDataList
    },
    onClickNode(index) {
      //TODO: replace with original implementation
      console.log('Click')
    },
    formatDimension(dimension) {
      if (typeof dimension === 'number') return `${dimension}px`
      if (dimension.indexOf('px') !== -1) {
        return dimension
      } else {
        return `${dimension}px`
      }
    },
    generateLinkPath(d) {
      switch (this.linkStyle) {
        case LinkStyle.CURVE:
          return generateCurvedNodeLinksPath(d, this.direction)
        case LinkStyle.STRAIGHT:
        default:
          return generateStraightNodeLinksPath(d, this.direction)
      }
    }
  },
  mounted() {
    const vm = this
    this.$nextTick(vm.draw)
  }
})
//# sourceMappingURL=VueTree.js.map
