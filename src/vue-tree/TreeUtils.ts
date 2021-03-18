import {
  D3TreeNodeLink,
  Point,
  RootNode,
  TreeDrawDirection,
  TreeNodeMap,
  TreeTransformOptions
} from './VueTree.types'
import * as d3 from 'd3'

const MATCH_TRANSLATE_REGEX = /translate\((-?\d+)px, ?(-?\d+)px\)/i

export const uuid = (): string => {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

export const treeBuilder = <T>(
  rootNode: RootNode<T>,
  nodeWidth: number,
  levelHeight: number
): TreeNodeMap<RootNode<T>> => {
  const d3TreeBuilder = d3
    .tree<RootNode<T>>()
    .nodeSize([nodeWidth, levelHeight])
  const tree = d3TreeBuilder(d3.hierarchy(rootNode))
  return [tree.descendants(), tree.links()]
}

export const rotatePoint = ([x, y]: Point): Point => {
  return [y, x]
}

/**
 * addUniqueKey adds a uuid to every node, if the Node already contains a _key not new key will be generated
 * @param rootNode
 */
export const addUniqueKey = <T>(rootNode: RootNode<T>): RootNode<T> => {
  const queue: Array<RootNode<T>> = [rootNode]
  while (queue.length !== 0) {
    const node: RootNode<T> = queue.pop()
    if (!('_key' in node) || !node['_key']) {
      node._key = uuid()
    }

    if ('children' in node) {
      queue.push(...node.children)
    }
  }
  return rootNode
}

export const extractTransformOriginOffsets = (
  transformOrigin?: string
): [number, number] => {
  let originOffsetX = 0
  let originOffsetY = 0
  if (transformOrigin) {
    const result = transformOrigin.match(MATCH_TRANSLATE_REGEX)
    if (result !== null && result.length !== 0) {
      const [offsetX, offsetY] = result.slice(1)
      originOffsetX = parseInt(offsetX)
      originOffsetY = parseInt(offsetY)
    }
  }
  return [originOffsetX, originOffsetY]
}

export const getTransformValue = (
  attrs: TreeTransformOptions
): Partial<CSSStyleDeclaration> => {
  const scale = attrs.scale || 0
  const translateX = attrs.translateX || 0
  const translateY = attrs.translateY || 0
  return {
    transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
    transformOrigin: 'center'
  }
}

export const generateCurvedNodeLinksPath = <T>(
  nodeLink: D3TreeNodeLink<T>,
  treeDir: TreeDrawDirection
): string => {
  const isVertical = treeDir === TreeDrawDirection.VERTICAL
  const linkPath = isVertical ? d3.linkVertical() : d3.linkHorizontal()
  linkPath
    .x(function ([x, y]) {
      return x
    })
    .y(function ([x, y]) {
      return y
    })
    .source(function ({ source }) {
      const sourcePoint: Point = source
      return isVertical ? sourcePoint : rotatePoint(sourcePoint)
    })
    .target(function ({ target }) {
      const targetPoint: Point = target
      return isVertical ? targetPoint : rotatePoint(targetPoint)
    })
  return linkPath.toString()
}

export const generateStraightNodeLinksPath = <T>(
  nodeLink: D3TreeNodeLink<T>,
  treeDir: TreeDrawDirection
): string => {
  const isVertical = treeDir === TreeDrawDirection.VERTICAL
  // the link path is: source -> secondPoint -> thirdPoint -> target
  const linkPath = d3.path()
  let sourcePoint: Point = [nodeLink.source.x, nodeLink.source.y]
  let targetPoint: Point = [nodeLink.target.x, nodeLink.target.y]
  if (!this.isVertical) {
    sourcePoint = rotatePoint(sourcePoint)
    targetPoint = rotatePoint(targetPoint)
  }
  const xOffset = targetPoint[0] - sourcePoint[0]
  const yOffset = targetPoint[1] - sourcePoint[1]
  const secondPoint = isVertical
    ? { x: sourcePoint[0], y: sourcePoint[1] + yOffset / 2 }
    : { x: sourcePoint[0] + xOffset / 2, y: sourcePoint[1] }
  const thirdPoint = isVertical
    ? { x: targetPoint[0], y: sourcePoint[1] + yOffset / 2 }
    : { x: sourcePoint[0] + xOffset / 2, y: targetPoint[1] }
  linkPath.moveTo(sourcePoint[0], sourcePoint[1])
  linkPath.lineTo(secondPoint.x, secondPoint.y)
  linkPath.lineTo(thirdPoint.x, thirdPoint.y)
  linkPath.lineTo(targetPoint[0], targetPoint[1])
  return linkPath.toString()
}
