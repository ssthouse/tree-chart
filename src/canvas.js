class OrgChart {
  constructor () {
    this.d3 = require('d3')
    this.container = this.d3.select('#container')
    this.canvasNode = this.container.append('canvas')
      .attr('width', 400)
      .attr('height', 400)
    this.hiddenCanvasNode = this.container.append('canvas')
      .attr('width', 400)
      .attr('height', 400)
    this.hiddenContext = this.hiddenCanvasNode.node().getContext('2d')
    this.context = this.canvasNode.node().getContext('2d')
    this.detachedContainer = document.createElement('root')
    this.dataContainerNode = this.d3.select(this.detachedContainer)
    this.colorNodeMap = {}

    this.init()
  }

  init () {
    this.drawCustom([1, 2, 13, 20, 23])
    this.setCanvasListener()
  }

  drawCustom (data) {
    let scale = this.d3.scaleLinear()
      .range([10, 390])
      .domain([1, 23])
    let dataBinding = this.dataContainerNode.selectAll('.node')
      .data(data, d => d)

    dataBinding.enter()
      .append('custom')
      .attr('class', 'rect')
      .attr('x', scale)
      .attr('y', 0)
      .attr('size', 15)
      .attr('fillStyle', 'pink')
      .transition()
      .duration(3000)
      .attr('size', 8)
      .attr('y', 100)
      .attr('fillStyle', 'red')

    // give each node a unique color
    let self = this
    this.dataContainerNode.selectAll('.rect')
      .each(function () {
        let node = self.d3.select(this)
        let newColor = self.randomColor()
        while (self.colorNodeMap[newColor]) {
          newColor = self.randomColor()
        }
        node.attr('colorKey', newColor)
        self.colorNodeMap[newColor] = node
        console.log('color: ' + node.attr('colorKey'))
      })
    this.d3.timer(function () {
      self.drawCanvas()
    })
  }

  randomColor () {
    let letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  drawCanvas () {
    this.drawShowCanvas()
    this.drawHiddenCanvas()
  }

  drawShowCanvas () {
    this.context.fillStyle = '#fff'
    this.context.rect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))
    this.context.fill()

    let self = this
    this.dataContainerNode.selectAll('.rect')
      .each(function (rectNode) {
        let node = self.d3.select(this)
        self.context.beginPath()
        self.context.fillStyle = node.attr('fillStyle')
        self.context.rect(node.attr('x'), node.attr('y'), node.attr('size'), node.attr('size'))
        self.context.fill()
        self.context.closePath()
      })
  }

  drawHiddenCanvas () {
    this.hiddenContext.fillStyle = '#fff'
    this.hiddenContext.rect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))
    this.hiddenContext.fill()

    let self = this
    this.dataContainerNode.selectAll('.rect')
      .each(function (rectNode) {
        let node = self.d3.select(this)
        self.hiddenContext.beginPath()
        self.hiddenContext.fillStyle = node.attr('colorKey')
        self.hiddenContext.rect(node.attr('x'), node.attr('y'), node.attr('size'), node.attr('size'))
        self.hiddenContext.fill()
        self.hiddenContext.closePath()
      })
  }

  setCanvasListener () {
    let self = this
    this.canvasNode.node().addEventListener('click', function (e) {
      let pixelData = self.hiddenContext.getImageData(e.layerX, e.layerY, 1, 1).data
      let colorStr = '#' + self.appendFront0(pixelData[0].toString(16)) +
        self.appendFront0(pixelData[1].toString(16)) +
        self.appendFront0(pixelData[2].toString(16))
      let node = self.colorNodeMap[colorStr]
      if (node) {
        node.transition()
          .duration(1000)
          .attr('fillStyle', colorStr)
          .attr('size', 50 * Math.random() + 20)
      }
    })
  }

  appendFront0 (numStr) {
    if (numStr.length !== 2) {
      return '0' + numStr
    } else {
      return numStr
    }
  }
}

export default OrgChart
