export var LinkStyle
;(function (LinkStyle) {
  LinkStyle['CURVE'] = 'curve'
  LinkStyle['STRAIGHT'] = 'straight'
})(LinkStyle || (LinkStyle = {}))
export var GraphDirection
;(function (GraphDirection) {
  GraphDirection['VERTICAL'] = 'vertical'
  GraphDirection['HORIZONTAL'] = 'horizontal'
})(GraphDirection || (GraphDirection = {}))
export const DEFAULT_NODE_WIDTH = 100
export const DEFAULT_NODE_HEIGHT = 100
export const DEFAULT_LEVEL_HEIGHT = 200
export const DefaultOptions = () => ({
  levelHeight: DEFAULT_LEVEL_HEIGHT,
  nodeHeight: DEFAULT_NODE_HEIGHT,
  nodeWidth: DEFAULT_NODE_WIDTH
})
//# sourceMappingURL=VueTreeTypes.js.map
