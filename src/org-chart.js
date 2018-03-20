import * as d3 from 'd3'
import generateOrgChartData from './dao.js'
import Util from './util.js'

class OrgChart {
  constructor () {
    this.d3 = d3
    this.init()
  }

  init () {
    this.initVariables()
    this.initCanvas()
    this.initVirtualNode()
    this.setCanvasListener()
  }

  initVariables () {
    this.width = 1000
    this.height = 1000
    this.padding = 20
    // tree node size
    this.nodeWidth = 180
    this.nodeHeight = 230
    // org unit size
    this.unitPadding = 20
    this.unitWidth = 140
    this.unitHeight = 100
    // animation duration
    this.duration = 600
    this.scale = 1.0
  }

  draw (data) {
    this.data = this.d3.hierarchy(data)
    this.treeGenerator = this.d3.tree()
      .nodeSize([this.nodeWidth, this.nodeHeight])
    this.update()

    let self = this
    this.d3.timer(function () {
      self.drawCanvas()
    })
  }

  update (targetTreeNode) {
    this.treeData = this.treeGenerator(this.data)
    let nodes = this.treeData.descendants()
    let links = this.treeData.links()

    let animatedStartX = 0
    let animatedStartY = 0
    let animatedEndX = 0
    let animatedEndY = 0
    if (targetTreeNode) {
      animatedStartX = targetTreeNode.x0
      animatedStartY = targetTreeNode.y0
      animatedEndX = targetTreeNode.x
      animatedEndY = targetTreeNode.y
    }

    this.updateOrgUnits(nodes, animatedStartX, animatedStartY, animatedEndX, animatedEndY)
    this.updateLinks(links, animatedStartX, animatedStartY, animatedEndX, animatedEndY)

    this.addColorKey()
    this.bindNodeToTreeData()
  }

  updateOrgUnits (nodes, animatedStartX, animatedStartY, animatedEndX, animatedEndY) {
    let orgUnit = this.virtualContainerNode.selectAll('.orgUnit')
      .data(nodes, d => d['colorKey'])

    orgUnit.attr('class', 'orgUnit')
      .attr('x', function (node) {
        return node.x0
      })
      .attr('y', function (node) {
        return node.y0
      })
      .transition()
      .duration(this.duration)
      .attr('x', function (node) {
        return node.x
      })
      .attr('y', function (node) {
        return node.y
      })
      .attr('fillStyle', '#ff0000')

    orgUnit.enter()
      .append('orgUnit')
      .attr('class', 'orgUnit')
      .attr('x', animatedStartX)
      .attr('y', animatedStartY)
      .transition()
      .duration(this.duration)
      .attr('x', function (node) {
        return node.x
      })
      .attr('y', function (node) {
        return node.y
      })
      .attr('fillStyle', '#ff0000')

    orgUnit.exit()
      .transition()
      .duration(this.duration)
      .attr('x', animatedEndX)
      .attr('y', animatedEndY)
      .remove()

    // record origin index for animation
    nodes.forEach(treeNode => {
      treeNode['x0'] = treeNode.x
      treeNode['y0'] = treeNode.y
    })

    orgUnit = null
  }

  updateLinks (links, animatedStartX, animatedStartY, animatedEndX, animatedEndY) {
    let link = this.virtualContainerNode.selectAll('.link')
      .data(links, function (d) {
        return d.source['colorKey'] + ':' + d.target['colorKey']
      })

    link.attr('class', 'link')
      .attr('sourceX', function (link) {
        return link.source['x00']
      })
      .attr('sourceY', function (link) {
        return link.source['y00']
      })
      .attr('targetX', function (link) {
        return link.target['x00']
      })
      .attr('targetY', function (link) {
        return link.target['y00']
      })
      .transition()
      .duration(this.duration)
      .attr('sourceX', function (link) {
        return link.source.x
      })
      .attr('sourceY', function (link) {
        return link.source.y
      })
      .attr('targetX', function (link) {
        return link.target.x
      })
      .attr('targetY', function (link) {
        return link.target.y
      })

    link.enter()
      .append('link')
      .attr('class', 'link')
      .attr('sourceX', animatedStartX)
      .attr('sourceY', animatedStartY)
      .attr('targetX', animatedStartX)
      .attr('targetY', animatedStartY)
      .transition()
      .duration(this.duration)
      .attr('sourceX', function (link) {
        return link.source.x
      })
      .attr('sourceY', function (link) {
        return link.source.y
      })
      .attr('targetX', function (link) {
        return link.target.x
      })
      .attr('targetY', function (link) {
        return link.target.y
      })

    link.exit()
      .transition()
      .duration(this.duration)
      .attr('sourceX', animatedEndX)
      .attr('sourceY', animatedEndY)
      .attr('targetX', animatedEndX)
      .attr('targetY', animatedEndY)
      .remove()

    // record origin data for animation
    links.forEach(treeNode => {
      treeNode.source['x00'] = treeNode.source.x
      treeNode.source['y00'] = treeNode.source.y
      treeNode.target['x00'] = treeNode.target.x
      treeNode.target['y00'] = treeNode.target.y
    })
    link = null
  }

  initCanvas () {
    this.container = this.d3.select('#container')
    this.canvasNode = this.container
      .append('canvas')
      .attr('class', 'orgChart')
      .attr('width', this.width)
      .attr('height', this.height)
    this.hiddenCanvasNode = this.container
      .append('canvas')
      .attr('class', 'orgChart')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('visibility', 'visible')
    this.context = this.canvasNode.node().getContext('2d')
    this.context.translate(this.width / 2, this.padding)
    this.hiddenContext = this.hiddenCanvasNode.node().getContext('2d')
    this.hiddenContext.translate(this.width / 2, this.padding)
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
        node.data()[0]['colorKey'] = newColor
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
    this.context.clearRect(-50000, -10000, 100000, 100000)

    let self = this
    // draw links
    this.virtualContainerNode.selectAll('.link')
      .each(function () {
        let node = self.d3.select(this)
        self.context.strokeStyle = '#555555'
        self.context.beginPath()
        self.context.fillStyle = '#aaaaaa'
        self.context.moveTo(node.attr('sourceX'), node.attr('sourceY'))
        self.context.lineTo(node.attr('targetX'), node.attr('targetY'))
        self.context.stroke()
      })

    this.virtualContainerNode.selectAll('.orgUnit')
      .each(function () {
        let node = self.d3.select(this)
        let treeNode = node.data()[0]
        let data = treeNode.data
        self.context.fillStyle = '#aaaaaa'
        let indexX = Number(node.attr('x')) - self.unitWidth / 2
        let indexY = Number(node.attr('y')) - self.unitHeight / 2
        Util.roundRect(self.context, indexX, indexY, self.unitWidth, self.unitHeight, 4, true, false)
        Util.text(self.context, data.name, indexX + self.unitPadding, indexY + self.unitPadding, '20px', '#000000')
        // Util.text(self.context, data.title, indexX + self.unitPadding, indexY + self.unitPadding + 30, '20px', '#000000')
        let maxWidth = self.unitWidth - 2 * self.unitPadding
        Util.wrapText(self.context, data.title, indexX + self.unitPadding, indexY + self.unitPadding + 24, maxWidth, 20)
      })
  }

  /**
   * fill the node outline with colorKey color
   */
  drawHiddenCanvas () {
    this.hiddenContext.clearRect(-50000, -10000, 100000, 100000)

    let self = this
    this.virtualContainerNode.selectAll('.orgUnit')
      .each(function () {
        let node = self.d3.select(this)
        self.hiddenContext.fillStyle = node.attr('colorKey')
        Util.roundRect(self.hiddenContext, Number(node.attr('x')) - self.unitWidth / 2, Number(node.attr('y')) - self.unitHeight / 2, self.unitWidth, self.unitHeight, 4, true, false)
      })
  }

  setCanvasListener () {
    this.setClickListener()
    this.setDragListener()
    this.setMouseWheelZoomListener()
  }

  setClickListener () {
    let self = this
    this.canvasNode.node().addEventListener('click', function (e) {
      let colorStr = Util.getColorStrFromCanvas(self.hiddenContext, e.layerX, e.layerY)
      let node = self.colorNodeMap[colorStr]
      if (node) {
        // let treeNodeData = node.data()[0]
        // self.hideChildren(treeNodeData, true)
        self.toggleTreeNode(node.data()[0])
        self.update(node.data()[0])
      }
    })
  }

  setMouseWheelZoomListener () {
    let self = this
    this.canvasNode.node().addEventListener('mousewheel', function (event) {
      event.preventDefault()
      if (event.deltaY < 0) {
        self.bigger()
      } else {
        self.smaller()
      }
    })
  }

  setDragListener () {
    this.onDrag_ = false
    this.dragStartPoint_ = {x: 0, y: 0}
    let self = this
    this.canvasNode.node().onmousedown = function (e) {
      self.dragStartPoint_.x = e.x
      self.dragStartPoint_.y = e.y
      self.onDrag_ = true
    }

    this.canvasNode.node().onmousemove = function (e) {
      if (!self.onDrag_) {
        return
      }
      self.context.translate((e.x - self.dragStartPoint_.x) / self.scale, (e.y - self.dragStartPoint_.y) / self.scale)
      self.hiddenContext.translate((e.x - self.dragStartPoint_.x) / self.scale, (e.y - self.dragStartPoint_.y) / self.scale)
      self.dragStartPoint_.x = e.x
      self.dragStartPoint_.y = e.y
    }

    this.canvasNode.node().onmouseout = function (e) {
      if (self.onDrag_) {
        self.onDrag_ = false
      }
    }

    this.canvasNode.node().onmouseup = function (e) {
      if (self.onDrag_) {
        self.onDrag_ = false
      }
    }
  }

  toggleTreeNode (treeNode) {
    if (treeNode.children) {
      treeNode._children = treeNode.children
      treeNode.children = null
    } else {
      treeNode.children = treeNode._children
      treeNode._children = null
    }
  }

  bigger () {
    if (this.scale > 7) {
      return
    }
    this.context.clearRect(-1000000, -10000, 2000000, 2000000)
    this.hiddenContext.clearRect(-1000000, -10000, 2000000, 2000000)

    this.scale = this.scale * 5 / 4
    this.context.scale(5 / 4, 5 / 4)
    this.hiddenContext.scale(5 / 4, 5 / 4)
  }

  smaller () {
    if (this.scale < 0.2) {
      return
    }
    this.context.clearRect(-1000000, -10000, 2000000, 2000000)
    this.hiddenContext.clearRect(-1000000, -10000, 2000000, 2000000)

    this.scale = this.scale * 4 / 5
    this.context.scale(4 / 5, 4 / 5)
    this.hiddenContext.scale(4 / 5, 4 / 5)
  }
}

export default OrgChart
