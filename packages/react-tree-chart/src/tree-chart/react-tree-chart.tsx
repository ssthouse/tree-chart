import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import TreeChartCore, { DEFAULT_LEVEL_HEIGHT, DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH, Direction, TreeLinkStyle } from '@ssthouse/tree-chart-core';
import { CSSTransitionGroup } from 'react-transition-group'
import './react-tree-chart.scss';

const formatDimension = (dimension: number | string) => {
  if (typeof dimension === "number") return `${dimension}px`;
  if (dimension.indexOf("px") !== -1) {
    return dimension;
  } else {
    return `${dimension}px`;
  }
};

export interface TreeChartNodeProps {
  data: unknown;
  collapsed: boolean;
}

interface TreeChartConfig {
  nodeWidth: number;
  nodeHeight: number;
  levelHeight: number;
}

interface TreeChartProps {
  /** basic tree node size config */
  config?: TreeChartConfig;
  /** link node with straight line or curve line */
  linkStyle?: TreeLinkStyle;
  /** chart direction, vertical or horizontal */
  direction?: Direction;
  /** if chart node can be click to toggle collapse status */
  collapseEnabled?: boolean;
  dataset: Object | Object[];
  /** css style for contaienr Div */
  style?: React.CSSProperties;
  /** 
   * custom tree node component
   * default node is <span>{value}</span> 
   * */
  renderCustomNode?: React.FC<TreeChartNodeProps>;
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
    renderCustomNode: customNode
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
      treeConfig: config,
    });

    setTreeChartCore(treeChartCore);
  }, [collapseEnabled, dataset, config])

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

      <CSSTransitionGroup
        transitionName="tree-node-item"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={800}>
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
              {
                customNode
                  ? customNode({ collapsed: node.data._collapsed, data: node.data })
                  : <span>{node.data.value}</span>
              }
            </div>
          })
        }
      </CSSTransitionGroup>
    </div >
  </div >
});

export default TreeChart;
