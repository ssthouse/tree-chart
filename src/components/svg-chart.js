import * as d3 from 'd3'

const NODE_WITDH = 10
const NODE_HEIGHT = 10

class SvgTree {
  constructor(treeData) {
    this.treeData = treeData
    this.d3 = d3
    this.nodeWidth = 800
    this.nodeHeight = 500
  }

  drawTree() {
    const treeBuilder = this.d3.tree().size([this.nodeWidth, this.nodeHeight])
    this.treeData = treeBuilder(this.d3.hierarchy(this.treeData))
    this.update(this.treeData.descendants(), this.treeData.links())
  }

  update(nodeDataList, linkDataList) {
    this.svg = this.d3.select('.svg')

    const self = this
    const links = this.svg.selectAll('link').data(linkDataList)
    links
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', function (d, i) {
        let linkPath = self.d3
          .linkVertical()
          .x(function (d) {
            return d.x + NODE_WITDH / 2
          })
          .y(function (d) {
            return d.y
          })
          .source(function (d) {
            return { x: d.source.x, y: d.source.y }
          })
          .target(function () {
            return { x: d.target.x, y: d.target.y }
          })
        return linkPath(d)
      })
    links.attr('class', 'link')
    links.exit().remove()

    const nodes = this.svg.selectAll('node').data(nodeDataList)
    nodes
      .enter()
      .append('rect')
      .attr('class', 'node')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', NODE_WITDH)
      .attr('height', NODE_HEIGHT)

    nodes
      .attr('class', 'node')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', NODE_WITDH)
      .attr('height', NODE_HEIGHT)

    nodes.exit().remove()
  }

  bigger() {
    // TODO
  }

  smaller() {
    // TODO
  }
}

export default SvgTree
