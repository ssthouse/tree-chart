import * as d3 from 'd3'
import generateOrgChartData from './dao.js'
import Util from './util.js'

class OrgChart {
  constructor () {
    this.d3 = d3
    this.init()
  }

  init () {
    this.width = 1000
    this.height = 1000
    this.padding = 50
    this.unitWidth = 10
    this.unitHeight = 15
    this.scale = 1
    this.initCanvas()
    this.initVirtualNode()
    this.setCanvasListener()
  }

  test () {
    let data = generateOrgChartData()

    data = this.d3.hierarchy(data)
    this.treeGenerator = this.d3.tree()
      // .size([this.width - this.padding, this.height - this.padding])
      .nodeSize([25, 100])
    this.update(data)
  }

  update (source) {
    this.treeData = this.treeGenerator(source)
    let nodes = this.treeData.descendants()
    let links = this.treeData.links()
    let self = this

    this.virtualContainerNode.selectAll('.node')
      .data(nodes, d => d)
      .enter()
      .append('orgUnit')
      .attr('class', 'orgUnit')
      .attr('x', function (node) {
        return node.x + self.width / 2
      })
      .attr('y', function (node) {
        return node.y + self.padding
      })
      .attr('fillStyle', '#ff0000')

    this.virtualContainerNode.selectAll('.node')
      .data(links, l => l)
      .enter()
      .append('link')
      .attr('class', 'link')
      .attr('sourceX', function (link) {
        return link.source.x + self.width / 2
      })
      .attr('sourceY', function (link) {
        return link.source.y + self.padding
      })
      .attr('targetX', function (link) {
        return link.target.x + self.width / 2
      })
      .attr('targetY', function (link) {
        return link.target.y + self.padding
      })

    this.addColorKey()
    this.bindNodeToTreeData()

    this.d3.timer(function () {
      self.drawCanvas()
    })
  }

  initCanvas () {
    this.container = this.d3.select('#container')
    this.canvasNode = this.container
      .append('canvas')
      .attr('width', this.width)
      .attr('height', this.height)
    this.hiddenCanvasNode = this.container
      .append('canvas')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('visibility', 'visible')
    this.context = this.canvasNode.node().getContext('2d')
    // this.context.translate(this.width / 2, this.padding)
    this.hiddenContext = this.hiddenCanvasNode.node().getContext('2d')
  }

  initVirtualNode () {
    let virtualContainer = document.createElement('root')
    this.virtualContainerNode = this.d3.select(virtualContainer)
    this.colorNodeMap = {}
  }

  addColorKey () {
    // give each node a unique color
    let self = this
    this.virtualContainerNode.selectAll('.orgUnit')
      .each(function () {
        let node = self.d3.select(this)
        let newColor = Util.randomColor()
        while (self.colorNodeMap[newColor]) {
          newColor = Util.randomColor()
        }
        node.attr('colorKey', newColor)
        self.colorNodeMap[newColor] = node
      })
  }

  bindNodeToTreeData () {
    // give each node a unique color
    let self = this
    this.virtualContainerNode.selectAll('.orgUnit')
      .each(function () {
        let node = self.d3.select(this)
        let data = node.data()[0]
        data['node'] = node
      })
  }

  drawCanvas () {
    this.drawShowCanvas()
    this.drawHiddenCanvas()
  }

  drawShowCanvas () {
    this.context.clearRect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))

    let self = this

    // draw links
    this.virtualContainerNode.selectAll('.link')
      .each(function () {
        let node = self.d3.select(this)
        self.context.beginPath()
        self.context.fillStyle = '#aaaaaa'
        self.context.moveTo(node.attr('sourceX'), node.attr('sourceY'))
        self.context.lineTo(node.attr('targetX'), node.attr('targetY'))
        self.context.stroke()
      })

    this.virtualContainerNode.selectAll('.orgUnit')
      .each(function () {
        let node = self.d3.select(this)
        self.context.beginPath()
        self.context.fillStyle = node.attr('fillStyle')
        self.context.arc(node.attr('x'), node.attr('y'), self.unitWidth, 0, 2 * Math.PI)
        self.context.fill()
        self.context.closePath()

        self.context.beginPath()
        self.context.fillStyle = node.attr('fillStyle')
        self.context.arc(node.attr('x'), node.attr('y'), self.unitWidth - 2, 0, 2 * Math.PI)
        self.context.fill()
        self.context.closePath()
      })
  }

  /**
   * fill the node outline with colorKey color
   */
  drawHiddenCanvas () {
    this.hiddenContext.clearRect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))

    let self = this
    this.virtualContainerNode.selectAll('.orgUnit')
      .each(function () {
        let node = self.d3.select(this)
        self.hiddenContext.beginPath()
        self.hiddenContext.fillStyle = node.attr('colorKey')
        self.hiddenContext.arc(node.attr('x'), node.attr('y'), self.unitWidth, 0, 2 * Math.PI)
        self.hiddenContext.fill()
        self.hiddenContext.closePath()
      })
  }

  setCanvasListener () {
    let self = this
    this.canvasNode.node().addEventListener('click', function (e) {
      let pixelData = self.hiddenContext.getImageData(e.layerX, e.layerY, 1, 1).data
      let colorStr = '#' + Util.appendFront0(pixelData[0].toString(16)) +
        Util.appendFront0(pixelData[1].toString(16)) +
        Util.appendFront0(pixelData[2].toString(16))
      let node = self.colorNodeMap[colorStr]
      if (node) {
        let treeNodeData = node.data()[0]
        self.hideChildren(treeNodeData, true)
      }
    })
  }

  hideChildren (parentNode, isRoot) {
    if (!parentNode) {
      return
    }
    if (!isRoot) {
      parentNode.node.transition()
        .duration(200)
        .attr('fillStyle', 'transparent')
    }
    if (!parentNode.children) {
      return
    }
    for (let i = 0; i < parentNode.children.length; i++) {
      this.hideChildren(parentNode.children[i], false)
    }
  }

  bigger () {
    this.context.clearRect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))
    this.context.scale(2, 2)

    this.hiddenContext.clearRect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))
    this.hiddenContext.scale(2, 2)
  }

  smaller () {
    this.context.clearRect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))
    this.context.scale(0.5, 0.5)

    this.hiddenContext.clearRect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))
    this.hiddenContext.scale(0.5, 0.5)
  }
}

export default OrgChart
