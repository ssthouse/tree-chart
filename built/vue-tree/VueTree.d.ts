import Vue from 'vue';
import * as d3 from 'd3';
import { GraphDirection, LinkStyle, TreeNode, VueTreeConfig } from './VueTreeTypes';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    addUniqueKey(rootNode: TreeNode): TreeNode;
    buildTree(rootNode: TreeNode): [d3.HierarchyPointNode<unknown>[], d3.HierarchyPointLink<unknown>[]];
}, {
    configGetter: Required<VueTreeConfig>;
    initialTransformStyle: Record<string, string>;
}, {
    config: VueTreeConfig;
    linkStyle: LinkStyle;
    direction: GraphDirection;
    dataset: TreeNode;
}>;
export default _default;
