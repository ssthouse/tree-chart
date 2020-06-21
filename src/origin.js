var d3 = require('d3')

var base = d3.select('#container')

var chart = base.append('canvas').attr('width', 400).attr('height', 300)
var context = chart.node().getContext('2d')

var dataContainer = base.append('custom')

function drawCustom(data) {
  var scale = d3.scaleLinear().range([10, 390]).domain(d3.extent(data))

  var dataBinding = dataContainer
    .selectAll('custom.rect')
    .data(data, function (d) {
      return d
    })

  dataBinding.attr('size', 15).attr('fillStyle', 'green')

  dataBinding
    .enter()
    .append('custom')
    .classed('rect', true)
    .attr('x', scale)
    .attr('y', 100)
    .attr('size', 8)
    .attr('fillStyle', 'red')

  dataBinding.exit().attr('size', 5).attr('fillStyle', 'lightgrey')

  drawCanvas()
}

function drawCanvas() {
  // clear canvas
  context.fillStyle = '#fff'
  context.rect(0, 0, chart.attr('width'), chart.attr('height'))
  context.fill()

  var elements = dataContainer.selectAll('custom.rect')
  elements.each(function (d) {
    var node = d3.select(this)

    context.beginPath()
    context.fillStyle = node.attr('fillStyle')
    context.rect(
      node.attr('x'),
      node.attr('y'),
      node.attr('size'),
      node.attr('size')
    )
    context.fill()
    context.closePath()
  })
}

function run() {
  drawCustom([1, 2, 13, 20, 23])
}

export default run
/* drawCustom([1,2,12,16,20]); */
