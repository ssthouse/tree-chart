export interface VueTreeConfig {
  nodeWidth?: number
  nodeHeight?: number
  levelHeight?: number
}

export interface TreeNode {
  _key?: string
  children?: Array<TreeNode>
}
export enum LinkStyle {
  CURVE = 'curve',
  STRAIGHT = 'straight'
}

export enum GraphDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export const DEFAULT_NODE_WIDTH: number = 100
export const DEFAULT_NODE_HEIGHT: number = 100
export const DEFAULT_LEVEL_HEIGHT: number = 200

export const DefaultOptions = (): Required<VueTreeConfig> => ({
  levelHeight: DEFAULT_LEVEL_HEIGHT,
  nodeHeight: DEFAULT_NODE_HEIGHT,
  nodeWidth: DEFAULT_NODE_WIDTH
})
