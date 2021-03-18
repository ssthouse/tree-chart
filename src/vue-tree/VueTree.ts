import Vue, { PropOptions } from 'vue'
import * as d3 from 'd3'
import {
  D3TreeNode,
  D3TreeNodeLink,
  DefaultOptions,
  TreeDrawDirection,
  LinkStyle,
  RootNode,
  VueTreeConfig,
  TreeTransformOptions,
  Point
} from './VueTree.types'

import { generateCurvedNodeLinksPath, generateStraightNodeLinksPath, rotatePoint, treeBuilder } from './TreeUtils'
import { HierarchyPointLink, HierarchyPointNode } from 'd3'

const MATCH_TRANSLATE_REGEX = /translate\((-?\d+)px, ?(-?\d+)px\)/i
const MATCH_SCALE_REGEX = /scale\((\S*)\)/i
const ANIMATION_DURATION = 800

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
      default: TreeDrawDirection.VERTICAL
    } as PropOptions<TreeDrawDirection>,
    // 展示的层级数据, 样例数据如: hierachical.json
    dataset: {
      type: Object,
      required: true
    } as PropOptions<RootNode<unknown>>
  },
  data() {
    return {
      colors: '568FE1',
      nodeDataList: [] as Array<D3TreeNode<unknown>>,
      linkDataList: [] as Array<D3TreeNodeLink<unknown>>,
      initTransformX: 0,
      initTransformY: 0,
      currentScale: 1,
      currentTransform: {} as TreeTransformOptions,
      // data properties to handle dragging
      isDragging: false,
      dragTransformMemory: {} as TreeTransformOptions,
      dragStartX: 0,
      dragStartY: 0
    }
  },
  computed: {
    isVertical() {
      return this.direction === TreeDrawDirection.VERTICAL
    },
    configGetter(): Required<VueTreeConfig> {
      return {
        ...DefaultOptions(),
        ...((this.config as VueTreeConfig) || {})
      }
    },
    datasetGetter(): RootNode<unknown> {
      return this.dataset as RootNode<unknown>
    },
    treeContainerElementRef(): HTMLElement {
      return this.$refs.container as HTMLElement
    },
    svgElementRef(): HTMLElement {
      return this.$refs.svg as HTMLElement
    },
    currentStyle(): Partial<CSSStyleDeclaration> {
      return {
        transform: `scale(1) translate(${this.initTransformX}px, ${this.initTransformY}px)`,
        transformOrigin: 'center'
      }
    },
    transformX(): number {
      const containerWidth = this.treeContainer.offsetWidth
      if (this.isVertical()) {
        return Math.floor(containerWidth / 2)
      }
      return Math.floor(this.configGetter.nodeWidth)
    },
    transformY(): number {
      if (this.isVertical()) {
        return Math.floor(this.configGetter.nodeHeight)
      }
      const containerHeight = this.treeContainer.offsetHeight
      return Math.floor(containerHeight / 2)
    }
  },
  methods: {
    onMouseDown(event: MouseEvent): void {
      this.isDragging = true
      this.dragStartX = event.clientX
      this.dragStartY = event.clientY
      this.dragTransformMemory = { ...this.currentTransform }
    },
    onMouseMove(event: MouseEvent): void {
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
    onMouseUp(): void {
      this.dragStartX = 0
      this.dragStartY = 0
      this.isDragging = false
    },
    draw(): void {
      const [nodeDataList, linkDataList] = treeBuilder(
        this.datasetGetter as RootNode<unknown>,
        this.configGetter.nodeWidth,
        this.configGetter.levelHeight
      )
      this.linkDataList = linkDataList
      const d3SvgSelector = d3.select<Element, D3TreeNodeLink<unknown>>(
        this.svgElementRef
      )

      const self = this
      const links = d3SvgSelector
        .selectAll('.link')
        .data(linkDataList, (d: HierarchyPointLink<RootNode<unknown>>) => {
          return `${d.source.data._key}-${d.target.data._key}`
        })

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
    generateLinkPath(d: D3TreeNodeLink<unknown>): string {
      switch (this.linkStyle as LinkStyle) {
        case LinkStyle.CURVE:
          return generateCurvedNodeLinksPath(d, this.direction)
        case LinkStyle.STRAIGHT:
        default:
          return generateStraightNodeLinksPath(d, this.direction)
      }
    }
  },
  mounted() {
    this.draw()
  }
})
