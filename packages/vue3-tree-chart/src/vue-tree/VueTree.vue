<template>
  <div class="tree-container" ref="container">
    <svg class="svg vue-tree" ref="svg" :style="initialTransformStyle"></svg>
    <div
      class="dom-container"
      ref="domContainer"
      :style="initialTransformStyle"
    >
      <transition-group name="tree-node-item" tag="div">
        <div
          class="node-slot"
          v-for="(node, index) of nodeDataList"
          @click="onClickNode(index)"
          :key="node.data._key"
          :style="{
            left: formatDimension(
              direction === DIRECTION.VERTICAL ? node.x : node.y
            ),
            top: formatDimension(
              direction === DIRECTION.VERTICAL ? node.y : node.x
            ),
            width: formatDimension(config.nodeWidth),
            height: formatDimension(config.nodeHeight),
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
import * as d3 from "d3";
import { uuid } from "../base/uuid";
import TreeChartCore from "@ssthouse/tree-chart-core";

const MATCH_TRANSLATE_REGEX = /translate\((-?\d+)px, ?(-?\d+)px\)/i;
const MATCH_SCALE_REGEX = /scale\((\S*)\)/i;

const LinkStyle = {
  CURVE: "curve",
  STRAIGHT: "straight",
};

const DIRECTION = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
};

const DEFAULT_NODE_WIDTH = 100;
const DEFAULT_NODE_HEIGHT = 100;
const DEFAULT_LEVEL_HEIGHT = 200;
/**
 * Used to decrement the height of the 'initTransformY' to center diagrams.
 * This is only a hotfix caused by the addition of '__invisible_root' node
 * for multi root purposes.
 */
const DEFAULT_HEIGHT_DECREMENT = 200;

const ANIMATION_DURATION = 800;

function rotatePoint({ x, y }) {
  return {
    x: y,
    y: x,
  };
}

export default {
  // setup(props, context) {
  //   let container = ref(null);
  //   let svg = ref(null)

  //   // watchEffect(() => {
  //   //     // This effect runs before the DOM is updated, and consequently,
  //   //     // the template ref does not hold a reference to the element yet.
  //   //     console.log('watchEffectwatchEffect')
  //   //     console.log(container.value) // => null
  //   //   })
  //   onMounted(() => {
  //     console.log('mounted11111')
  //     console.log(container.value) // undefined
  //   })

  //   return  {
  //       container,
  //       svg
  //   }
  // },
  name: "vue-tree",
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          nodeWidth: DEFAULT_NODE_WIDTH,
          nodeHeight: DEFAULT_NODE_HEIGHT,
          levelHeight: DEFAULT_LEVEL_HEIGHT,
        };
      },
    },
    linkStyle: {
      type: String,
      default: LinkStyle.CURVE,
    },
    direction: {
      type: String,
      default: DIRECTION.VERTICAL,
    },
    collapseEnabled: {
      type: Boolean,
      default: true,
    },
    // 展示的层级数据, 样例数据如: hierachical.json
    dataset: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      treeChartCore: null,
      d3,
      nodeDataList: [],
      linkDataList: [],
      initTransformX: 0,
      initTransformY: 0,
      DIRECTION,
      initialTransformStyle: {},
    };
  },
  computed: {
    // _dataset() {
    //   return this.updatedInternalData(this.dataset);
    // },
  },
  mounted() {
    console.log("mounted");
    this.init();
  },
  beforeDestroy() {
    this.treeChartCore.destroy();
  },
  methods: {
    init() {
      this.treeChartCore = new TreeChartCore({
        svgElement: this.$refs.svg,
        domElement: this.$refs.domContainer,
        treeContainer: this.$refs.container,
        dataSet: {
          value: "1",
          children: [
            { value: "2", children: [{ value: "4" }, { value: "5" }] },
            { value: "3" },
          ],
        },
      });
      // this.draw();
      // this.enableDrag();
      // this.initTransform();
      this.treeChartCore.init();
      this.nodeDataList = this.treeChartCore.getNodeDataList();
      this.initialTransformStyle =
        this.treeChartCore.getInitialTransformStyle();
      console.log(this);
    },
    zoomIn() {
      this.treeChartCore.zoomIn();
    },
    zoomOut() {
      this.treeChartCore.zoomOut();
    },
    restoreScale() {
      this.treeChartCore.setScale(1);
    },
    onClickNode(index) {
      this.treeChartCore.onClickNode(index);
      this.nodeDataList = this.treeChartCore.getNodeDataList();
      // this.treeChartCore.initTransform();
      // this.initialTransformStyle =
      //   this.treeChartCore.getInitialTransformStyle();
    },
    formatDimension(dimension) {
      if (typeof dimension === "number") return `${dimension}px`;
      if (dimension.indexOf("px") !== -1) {
        return dimension;
      } else {
        return `${dimension}px`;
      }
    },
  },
  watch: {
    // _dataset: {
    //   deep: true,
    //   handler: function () {
    //     this.draw();
    //     this.initTransform();
    //   },
    // },
  },
};
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
    transform-origin: 0 50%;
  }

  .dom-container {
    z-index: 1;
    pointer-events: none;
  }
}

.node-slot {
  cursor: pointer;
  pointer-events: all;
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
