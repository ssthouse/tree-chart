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
              direction === Direction.VERTICAL ? node.x : node.y
            ),
            top: formatDimension(
              direction === Direction.VERTICAL ? node.y : node.x
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
import TreeChartCore, {
  DEFAULT_NODE_WIDTH,
  DEFAULT_NODE_HEIGHT,
  DEFAULT_LEVEL_HEIGHT,
  TreeLinkStyle,
  Direction,
} from "@ssthouse/tree-chart-core";

const formatDimension = (dimension) => {
  if (typeof dimension === "number") return `${dimension}px`;
  if (dimension.indexOf("px") !== -1) {
    return dimension;
  } else {
    return `${dimension}px`;
  }
};

export default {
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
      default: TreeLinkStyle.CURVE,
    },
    direction: {
      type: String,
      default: Direction.VERTICAL,
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
      formatDimension,
      Direction,
      treeChartCore: null,
      nodeDataList: [],
      initialTransformStyle: {},
    };
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    // remove dom reference
    this.treeChartCore.destroy();
  },
  methods: {
    init() {
      this.treeChartCore = new TreeChartCore({
        svgElement: this.$refs.svg,
        domElement: this.$refs.domContainer,
        treeContainer: this.$refs.container,
        dataset: this.dataset,
        direction: this.direction,
        treeConfig: this.config,
        collapseEnabled: this.collapseEnabled,
        linkStyle: this.linkStyle
      });
      this.treeChartCore.init();
      this.nodeDataList = this.treeChartCore.getNodeDataList();
      this.initialTransformStyle =
        this.treeChartCore.getInitialTransformStyle();
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
    },
  },
  watch: {
    dataset: {
      deep: true,
      handler: function () {
        this.treeChartCore.updateDataset(this.dataset);
        this.nodeDataList = this.treeChartCore.getNodeDataList();
      },
    },
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
