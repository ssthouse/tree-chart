import { TreeNode } from './VueTreeTypes';
import { HierarchyPointLink, HierarchyPointNode } from 'd3';
declare type TreeBuilded<T> = [Array<HierarchyPointNode<T>>, Array<HierarchyPointLink<T>>];
export declare const uuid: () => string;
export declare const treeBuilder: <T>(rootNode: T, nodeWidth: number, levelHeight: number) => TreeBuilded<T>;
export declare const addUniqueKey: (rootNode: TreeNode) => TreeNode;
export {};
