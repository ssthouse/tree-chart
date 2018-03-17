var d3 = require('d3')

var container = d3.select('#container')
var canvasNode = container.append('canvas')
  .attr('width', 400)
  .attr('height', 400)
var context = canvasNode.node().getContext('2d')

var detachedContainer = document.createElement('root')
var dataContainerNode = d3.select(detachedContainer)

function init () {
  console.log('hi this is canvas.js')

  drawCustom([1, 2, 13, 20, 23], context, dataContainerNode, canvasNode)
}

function drawCustom (data, ctx, dataContainerNode, canvasNode) {
  var scale = d3.scaleLinear()
    .range([10, 390])
    .domain([1, 23])

  var dataBinding = dataContainerNode.selectAll('.node')
    .data(data, d => d)

  // dataBinding
  //   .attr('size', 8)
  //   .transition()
  //   .duration(3000)
  //   .attr('size', 15)
  //   .attr('fillStyle', 'green')
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
  // dataBinding.exit()
  //   .attr('size', 5)
  //   .transition()
  //   .duration(3000)
  //   .attr('size', 15)
  //   .attr('fillStyle', 'lightgrey')
  d3.timer(drawCanvas)
}

function drawCanvas () {
  context.fillStyle = '#fff'
  context.rect(0, 0, canvasNode.attr('width'), canvasNode.attr('height'))
  context.fill()

  dataContainerNode.selectAll('.rect')
    .each(function (rectNode) {
      var node = d3.select(this)
      context.beginPath()
      context.fillStyle = node.attr('fillStyle')
      context.rect(node.attr('x'), node.attr('y'), node.attr('size'), node.attr('size'))
      context.fill()
      context.closePath()
    })
}

export default init
