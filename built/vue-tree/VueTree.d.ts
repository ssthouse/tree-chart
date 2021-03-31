import Vue from 'vue';
import { D3TreeNode, D3TreeNodeLink, TreeDrawDirection, LinkStyle, RootNode, VueTreeConfig, TreeTransformOptions } from './VueTree.types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, {
    TreeDrawDirection: typeof TreeDrawDirection;
    colors: string;
    nodeDataList: D3TreeNode<unknown>[];
    linkDataList: D3TreeNodeLink<unknown>[];
    initTransformX: number;
    initTransformY: number;
    currentScale: number;
    currentTransform: TreeTransformOptions;
    isDragging: boolean;
    dragTransformMemory: TreeTransformOptions;
    dragStartX: number;
    dragStartY: number;
}, {
    onMouseDown(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    onMouseUp(): void;
    draw(): void;
    onClickNode(index: any): void;
    formatDimension(dimension: string | number): string;
    generateLinkPath(d: D3TreeNodeLink<unknown>): string;
}, {
    isVertical: boolean;
    configGetter: Required<VueTreeConfig>;
    datasetGetter: RootNode<unknown>;
    treeContainerElementRef: HTMLElement;
    svgElementRef: HTMLElement;
    currentStyle: Partial<CSSStyleDeclaration>;
    transformX: number;
    transformY: number;
}, {
    config: VueTreeConfig;
    linkStyle: LinkStyle;
    direction: TreeDrawDirection;
    dataset: RootNode<unknown>;
}>;
export default _default;
