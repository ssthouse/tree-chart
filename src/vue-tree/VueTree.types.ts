import { HierarchyPointLink, HierarchyPointNode } from 'd3'

export interface VueTreeConfig {
  nodeWidth?: number
  nodeHeight?: number
  levelHeight?: number
}

export type WithChildren<T> = T & {
  children?: Array<WithChildren<T>>
}

export type WithKey<T> = T & { _key?: string }

export type RootNode<T> = WithChildren<WithKey<T>> & {
  _collapsed?: boolean
  value?: string
}

export enum LinkStyle {
  CURVE = 'curve',
  STRAIGHT = 'straight'
}

export enum TreeDrawDirection {
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

export type D3TreeNode<T> = HierarchyPointNode<RootNode<T>>
export type D3TreeNodeLink<T> = HierarchyPointLink<RootNode<T>>

export type TreeNodeMap<T> = [Array<D3TreeNode<T>>, Array<D3TreeNodeLink<T>>]

export type Point = [number, number]

export interface TreeTransformOptions {
  scale?: number
  translateX?: number
  translateY?: number
}
