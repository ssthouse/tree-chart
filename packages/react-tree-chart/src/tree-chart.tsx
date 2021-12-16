import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import TreeChartCore, { DEFAULT_LEVEL_HEIGHT, DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH, Direction, TreeLinkStyle } from '@ssthouse/tree-chart-core';
import './tree-chart.scss';

const formatDimension = (dimension: number | string) => {
  if (typeof dimension === "number") return `${dimension}px`;
  if (dimension.indexOf("px") !== -1) {
    return dimension;
  } else {
    return `${dimension}px`;
  }
};

interface TreeChartConfig {
  nodeWidth: number;
  nodeHeight: number;
  levelHeight: number;
}

interface TreeChartProps {
  config?: TreeChartConfig;
  linkStyle?: TreeLinkStyle;
  direction?: Direction;
  collapseEnabled?: boolean;
  dataset: Object | Object[];
  style?: React.CSSProperties;
}

const DEFAULT_CONFIG = {
  nodeWidth: DEFAULT_NODE_WIDTH,
  nodeHeight: DEFAULT_NODE_HEIGHT,
  levelHeight: DEFAULT_LEVEL_HEIGHT,
};

const TreeChart = forwardRef((props: TreeChartProps, ref) => {
  const {
    direction = Direction.VERTICAL,
    config = DEFAULT_CONFIG,
    dataset,
    collapseEnabled = true,
    style = {},
  } = props;
  const [treeChartCore, setTreeChartCore] = useState<TreeChartCore>();
  const [initialTransformStyle, setInitialTransformStyle] = useState({})
  const [nodeDataList, setNodeDataList] = useState<any[]>([]);

  // refs
  const containerRef = useRef<HTMLDivElement>(null);
  const domContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // init tree chart core with refs
  useEffect(() => {
    console.log('update collapse', collapseEnabled)
    const treeChartCore = new TreeChartCore({
      svgElement: svgRef.current as SVGElement,
      domElement: domContainerRef.current as HTMLDivElement,
      treeContainer: containerRef.current as HTMLDivElement,
      dataset,
      collapseEnabled,
    });

    setTreeChartCore(treeChartCore);
  }, [collapseEnabled, dataset])

  useEffect(() => {
    if (!treeChartCore) return;
    treeChartCore.init();
    const nodeDataList = treeChartCore.getNodeDataList();
    const initialTransformStyle = treeChartCore.getInitialTransformStyle();
    setInitialTransformStyle(initialTransformStyle)
    setNodeDataList(nodeDataList);
  }, [treeChartCore]);

  const onClickNode = (index: number) => {
    if (!treeChartCore) return;
    treeChartCore.onClickNode(index);
    setNodeDataList(treeChartCore.getNodeDataList());
  }

  useImperativeHandle(ref, () => {
    return {
      zoomIn() {
        treeChartCore?.zoomIn();
      },
      zoomOut() {
        treeChartCore?.zoomOut();
      },
      restoreScale() {
        treeChartCore?.setScale(1);
      },
    }
  })
  return <div className="tree-container"
    ref={containerRef} style={style}>
    <svg className="svg vue-tree" ref={svgRef} style={initialTransformStyle}></svg>
    <div
      className="dom-container"
      ref={domContainerRef}
      style={initialTransformStyle}
    >
      {/* <transition-group name="tree-node-item" tag="div"> */}

      {
        nodeDataList.map((node, index) => {
          return <div
            className="node-slot"
            onClick={() => onClickNode(index)}
            key={node.data._key}
            style={{
              left: formatDimension(
                direction === Direction.VERTICAL ? node.x : node.y
              ),
              top: formatDimension(
                direction === Direction.VERTICAL ? node.y : node.x
              ),
              width: formatDimension(config.nodeWidth),
              height: formatDimension(config.nodeHeight),
            }}
          >
            {/* <slot
              name="node"
              v-bind:node="node.data"
              v-bind:collapsed="node.data._collapsed"
            > */}
            <span>{node.data.value}</span>
            {/* </slot> */}
          </div>
        })
      }
      {/* </transition - group > */}
    </div >
  </div >
});

export default TreeChart;
