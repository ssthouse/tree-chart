export interface VueTreeConfig {
    nodeWidth?: number;
    nodeHeight?: number;
    levelHeight?: number;
}
export interface TreeNode {
    _key?: string;
    children?: Array<TreeNode>;
}
export declare enum LinkStyle {
    CURVE = "curve",
    STRAIGHT = "straight"
}
export declare enum GraphDirection {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal"
}
export declare const DEFAULT_NODE_WIDTH: number;
export declare const DEFAULT_NODE_HEIGHT: number;
export declare const DEFAULT_LEVEL_HEIGHT: number;
export declare const DefaultOptions: () => Required<VueTreeConfig>;
