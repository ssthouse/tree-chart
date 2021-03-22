declare class OrgChart {
    d3: any;
    width: number;
    height: number;
    padding: number;
    nodeWidth: number;
    nodeHeight: number;
    unitPadding: number;
    unitWidth: number;
    unitHeight: number;
    duration: number;
    scale: number;
    data: any;
    treeGenerator: any;
    treeData: any;
    virtualContainerNode: any;
    container: any;
    canvasNode: any;
    hiddenCanvasNode: any;
    context: any;
    hiddenContext: any;
    colorNodeMap: {};
    onDrag_: boolean;
    dragStartPoint_: {
        x: number;
        y: number;
    };
    constructor();
    init(): void;
    initVariables(): void;
    draw(data: any): void;
    update(targetTreeNode: any): void;
    updateOrgUnits(nodes: any, animatedStartX: any, animatedStartY: any, animatedEndX: any, animatedEndY: any): void;
    updateLinks(links: any, animatedStartX: any, animatedStartY: any, animatedEndX: any, animatedEndY: any): void;
    initCanvas(): void;
    initVirtualNode(): void;
    addColorKey(): void;
    bindNodeToTreeData(): void;
    drawCanvas(): void;
    drawShowCanvas(): void;
    /**
     * fill the node outline with colorKey color
     */
    drawHiddenCanvas(): void;
    setCanvasListener(): void;
    setClickListener(): void;
    setMouseWheelZoomListener(): void;
    setDragListener(): void;
    toggleTreeNode(treeNode: any): void;
    bigger(): void;
    smaller(): void;
    clearCanvas_(): void;
}
export default OrgChart;
