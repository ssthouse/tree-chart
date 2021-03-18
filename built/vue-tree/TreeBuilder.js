import * as d3 from 'd3'
export const uuid = () => {
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
export const treeBuilder = (rootNode, nodeWidth, levelHeight) => {
  const treeBuilder = d3.tree().nodeSize([nodeWidth, levelHeight])
  const tree = treeBuilder(d3.hierarchy(rootNode))
  return [tree.descendants(), tree.links()]
}
export const addUniqueKey = (rootNode) => {
  const queue = [rootNode]
  while (queue.length !== 0) {
    const node = queue.pop()
    node._key = uuid()
    if (node.children) {
      queue.push(...node.children)
    }
  }
  return rootNode
}
//# sourceMappingURL=TreeBuilder.js.map
