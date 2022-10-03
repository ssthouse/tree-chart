import * as d3 from 'd3';
import { ANIMATION_DURATION, DEFAULT_HEIGHT_DECREMENT, DEFAULT_LEVEL_HEIGHT, DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH, MATCH_SCALE_REGEX, MATCH_TRANSLATE_REGEX } from './constant';
import { TreeDataset, Direction, TreeLinkStyle } from './tree-chart';
import { deepCopy, rotatePoint } from './util';


interface TreeConfig {
  nodeWidth: number;
  nodeHeight: number;
  levelHeight: number;
}


interface TreeChartCoreParams {
  treeConfig?: TreeConfig;
  linkStyle?: TreeLinkStyle;
  direction?: Direction;
  collapseEnabled: boolean;
  dataset: TreeDataset;
  svgElement: SVGElement;
  domElement: HTMLDivElement;
  treeContainer: HTMLDivElement;
}

export default class TreeChartCore {
  treeConfig: TreeConfig = {
    nodeWidth: DEFAULT_NODE_WIDTH,
    nodeHeight: DEFAULT_NODE_HEIGHT,
    levelHeight: DEFAULT_LEVEL_HEIGHT,
  };
  linkStyle: TreeLinkStyle = TreeLinkStyle.CURVE;
  direction: Direction = Direction.VERTICAL;
  collapseEnabled: boolean = true

  dataset: TreeDataset;

  svgElement: SVGElement;
  svgSelection: any;
  domElement: HTMLDivElement;
  treeContainer: HTMLDivElement;

  nodeDataList: any[];
  linkDataList: any[];
  initTransformX: number;
  initTransformY: number;

  currentScale: number = 1;

  constructor(params: TreeChartCoreParams) {
    if (params.treeConfig) {
      this.treeConfig = params.treeConfig;
    }
    this.collapseEnabled = params.collapseEnabled
    this.svgElement = params.svgElement;
    this.domElement = params.domElement;
    this.treeContainer = params.treeContainer;
    this.dataset = this.updatedInternalData(params.dataset);
    if (params.direction) this.direction = params.direction;
    if (params.linkStyle) this.linkStyle = params.linkStyle
  }

  init() {
    this.draw();
    this.enableDrag();
    this.initTransform();
  }

  getNodeDataList() {
    return this.nodeDataList;
  }

  getInitialTransformStyle(): Record<string, string> {
    return {
      transform: `scale(1) translate(${this.initTransformX}px, ${this.initTransformY}px)`,
      transformOrigin: "center",
    };
  }

  zoomIn() {
    const originTransformStr = this.domElement.style.transform;
    // 如果已有scale属性, 在原基础上修改
    let targetScale = 1 * 1.2;
    const scaleMatchResult = originTransformStr.match(MATCH_SCALE_REGEX);
    if (scaleMatchResult && scaleMatchResult.length > 0) {
      const originScale = parseFloat(scaleMatchResult[1]);
      targetScale *= originScale;
    }
    this.setScale(targetScale);
  }

  zoomOut() {
    const originTransformStr = this.domElement.style.transform;
    // 如果已有scale属性, 在原基础上修改
    let targetScale = 1 / 1.2;
    const scaleMatchResult = originTransformStr.match(MATCH_SCALE_REGEX);
    if (scaleMatchResult && scaleMatchResult.length > 0) {
      const originScale = parseFloat(scaleMatchResult[1]);
      targetScale = originScale / 1.2;
    }
    this.setScale(targetScale);
  }

  restoreScale() {
    this.setScale(1);
  }

  setScale(scaleNum) {
    if (typeof scaleNum !== "number") return;
    let pos = this.getTranslate();
    let translateString = `translate(${pos[0]}px, ${pos[1]}px)`;
    this.svgElement.style.transform = `scale(${scaleNum}) ` + translateString;
    this.domElement.style.transform =
      `scale(${scaleNum}) ` + translateString;
    this.currentScale = scaleNum;
  }
  getTranslate() {
    let string = this.svgElement.style.transform;
    let match = string.match(MATCH_TRANSLATE_REGEX);
    if (match === null) {
      return [null, null];
    }
    let x = parseInt(match[1]);
    let y = parseInt(match[2]);
    return [x, y];
  }


  isVertical() {
    return this.direction === Direction.VERTICAL;
  }
  /**
 * 根据link数据,生成svg path data
 */
  private generateLinkPath(d) {
    const self = this;
    if (this.linkStyle === TreeLinkStyle.CURVE) {
      return this.generateCurceLinkPath(self, d);
    }
    if (this.linkStyle === TreeLinkStyle.STRAIGHT) {
      // the link path is: source -> secondPoint -> thirdPoint -> target
      return this.generateStraightLinkPath(d);
    }
  }

  private generateCurceLinkPath(self: this, d: any) {
    const linkPath = this.isVertical()
      ? d3.linkVertical()
      : d3.linkHorizontal();
    linkPath
      .x(function (d) {
        return d.x;
      })
      .y(function (d) {
        return d.y;
      })
      .source(function (d) {
        const sourcePoint = {
          x: d.source.x,
          y: d.source.y,
        };
        return self.direction === Direction.VERTICAL
          ? sourcePoint
          : rotatePoint(sourcePoint);
      })
      .target(function (d) {
        const targetPoint = {
          x: d.target.x,
          y: d.target.y,
        };
        return self.direction === Direction.VERTICAL
          ? targetPoint
          : rotatePoint(targetPoint);
      });
    return linkPath(d);
  }

  private generateStraightLinkPath(d: any) {
    const linkPath = d3.path();
    let sourcePoint = { x: d.source.x, y: d.source.y };
    let targetPoint = { x: d.target.x, y: d.target.y };
    if (!this.isVertical()) {
      sourcePoint = rotatePoint(sourcePoint);
      targetPoint = rotatePoint(targetPoint);
    }
    const xOffset = targetPoint.x - sourcePoint.x;
    const yOffset = targetPoint.y - sourcePoint.y;
    const secondPoint = this.isVertical()
      ? { x: sourcePoint.x, y: sourcePoint.y + yOffset / 2 }
      : { x: sourcePoint.x + xOffset / 2, y: sourcePoint.y };
    const thirdPoint = this.isVertical()
      ? { x: targetPoint.x, y: sourcePoint.y + yOffset / 2 }
      : { x: sourcePoint.x + xOffset / 2, y: targetPoint.y };
    linkPath.moveTo(sourcePoint.x, sourcePoint.y);
    linkPath.lineTo(secondPoint.x, secondPoint.y);
    linkPath.lineTo(thirdPoint.x, thirdPoint.y);
    linkPath.lineTo(targetPoint.x, targetPoint.y);
    return linkPath.toString();
  }

  updateDataList() {
    let [nodeDataList, linkDataList] = this.buildTree()
    nodeDataList.splice(0, 1);
    linkDataList = linkDataList.filter(
      (x) => x.source.data.name !== "__invisible_root"
    );
    this.linkDataList = linkDataList;
    this.nodeDataList = nodeDataList;
  }

  private draw() {
    this.updateDataList();
    const identifier = this.dataset["identifier"];
    const specialLinks = this.dataset["links"];
    if (specialLinks && identifier) {
      for (const link of specialLinks) {
        let parent,
          children = undefined;
        if (identifier === "value") {
          parent = this.nodeDataList.find((d) => {
            return d[identifier] == link.parent;
          });
          children = this.nodeDataList.filter((d) => {
            return d[identifier] == link.child;
          });
        } else {
          parent = this.nodeDataList.find((d) => {
            return d["data"][identifier] == link.parent;
          });
          children = this.nodeDataList.filter((d) => {
            return d["data"][identifier] == link.child;
          });
        }
        if (parent && children) {
          for (const child of children) {
            const new_link = {
              source: parent,
              target: child,
            };
            this.linkDataList.push(new_link);
          }
        }
      }
    }

    this.svgSelection = d3.select(this.svgElement);

    const self = this;
    const links = this.svgSelection
      .selectAll(".link")
      .data(this.linkDataList, (d) => {
        return `${d.source.data._key}-${d.target.data._key}`;
      });

    links
      .enter()
      .append("path")
      .style("opacity", 0)
      .transition()
      .duration(ANIMATION_DURATION)
      .ease(d3.easeCubicInOut)
      .style("opacity", 1)
      .attr("class", "link")
      .attr("d", function (d) {
        return self.generateLinkPath(d);
      });
    links
      .transition()
      .duration(ANIMATION_DURATION)
      .ease(d3.easeCubicInOut)
      .attr("d", function (d) {
        return self.generateLinkPath(d);
      });
    links
      .exit()
      .transition()
      .duration(ANIMATION_DURATION / 2)
      .ease(d3.easeCubicInOut)
      .style("opacity", 0)
      .remove();
  }

  /**
 * Returns updated dataset by deep copying every nodes from the externalData and adding unique '_key' attributes.
 **/
  private updatedInternalData(externalData) {
    var data = { name: "__invisible_root", children: [] };
    if (!externalData) return data;
    if (Array.isArray(externalData)) {
      for (var i = externalData.length - 1; i >= 0; i--) {
        data.children.push(deepCopy(externalData[i]));
      }
    } else {
      data.children.push(deepCopy(externalData));
    }
    return data;
  }

  private buildTree() {
    const treeBuilder = d3
      .tree()
      .nodeSize([this.treeConfig.nodeWidth, this.treeConfig.levelHeight]);
    const tree = treeBuilder(d3.hierarchy(this.dataset));
    return [tree.descendants(), tree.links()];
  }

  private enableDrag() {
    let startX = 0;
    let startY = 0;
    let isDrag = false;
    // 保存鼠标点下时的位移
    let mouseDownTransform = "";
    this.treeContainer.onpointerdown = (event) => {
      mouseDownTransform = this.svgElement.style.transform;
      startX = event.clientX;
      startY = event.clientY;
      isDrag = true;
    };
    this.treeContainer.onpointermove = (event) => {
      if (!isDrag) return;
      const originTransform = mouseDownTransform;
      let originOffsetX = 0;
      let originOffsetY = 0;
      if (originTransform) {
        const result = originTransform.match(MATCH_TRANSLATE_REGEX);
        if (result !== null && result.length !== 0) {
          const [offsetX, offsetY] = result.slice(1);
          originOffsetX = parseInt(offsetX);
          originOffsetY = parseInt(offsetY);
        }
      }
      let newX =
        Math.floor((event.clientX - startX) / this.currentScale) +
        originOffsetX;
      let newY =
        Math.floor((event.clientY - startY) / this.currentScale) +
        originOffsetY;
      let transformStr = `translate(${newX}px, ${newY}px)`;
      if (originTransform) {
        transformStr = originTransform.replace(
          MATCH_TRANSLATE_REGEX,
          transformStr
        );
      }
      this.svgElement.style.transform = transformStr;
      this.domElement.style.transform = transformStr;
    };

    this.treeContainer.onpointerup = () => {
      startX = 0;
      startY = 0;
      isDrag = false;
    };
  }

  initTransform() {
    const containerWidth = this.domElement.offsetWidth;
    const containerHeight = this.domElement.offsetHeight;
    if (this.isVertical()) {
      this.initTransformX = Math.floor(containerWidth / 2);
      this.initTransformY = Math.floor(
        this.treeConfig.nodeHeight - DEFAULT_HEIGHT_DECREMENT
      );
    } else {
      this.initTransformX = Math.floor(
        this.treeConfig.nodeWidth - DEFAULT_HEIGHT_DECREMENT
      );
      this.initTransformY = Math.floor(containerHeight / 2);
    }
  }

  onClickNode(index: number) {
    if (this.collapseEnabled) {
      const curNode = this.nodeDataList[index];
      if (curNode.data.children) {
        curNode.data._children = curNode.data.children;
        curNode.data.children = null;
        curNode.data._collapsed = true;
      } else {
        curNode.data.children = curNode.data._children;
        curNode.data._children = null;
        curNode.data._collapsed = false;
      }
      this.draw();
    }
  }

  /**
   * call this function to update dataset
   * notice : you need to update the view rendered by `nodeDataList` too
   * @param dataset the new dataset to show in chart
   */
  updateDataset(dataset: TreeDataset) {
    this.dataset = this.updatedInternalData(dataset);
    this.draw();
  }

  /**
   * release all dom reference
   */
  destroy() {
    this.svgElement = null;
    this.domElement = null;
    this.treeContainer = null;
  }
}