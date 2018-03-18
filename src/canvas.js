import * as d3 from 'd3'

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
    let data = {
      'name': 'Lao Lao',
      'title': 'general manager',
      'children': [
        {'name': 'Bo Miao', 'title': 'department manager'},
        {
          'name': 'Su Miao',
          'title': 'department manager',
          'children': [
            {'name': 'Tie Hua', 'title': 'senior engineer'},
            {
              'name': 'Hei Hei',
              'title': 'senior engineer',
              'children': [
                {'name': 'Pang Pang', 'title': 'engineer'},
                {'name': 'Xiang Xiang', 'title': 'UE engineer'}
              ]
            }
          ]
        },
        {'name': 'Hong Miao', 'title': 'department manager'},
        {'name': 'Chun Miao', 'title': 'department manager'}
      ]
    }

    // for (let i = 0; i < 40; i++) {
    //   data['children'].push({
    //     'name': 'Lao Lao',
    //     'title': 'general manager',
    //     'children': [
    //       {'name': 'Bo Miao', 'title': 'department manager'},
    //       {
    //         'name': 'Su Miao',
    //         'title': 'department manager',
    //         'children': [
    //           {'name': 'Tie Hua', 'title': 'senior engineer'},
    //           {
    //             'name': 'Hei Hei',
    //             'title': 'senior engineer',
    //             'children': [
    //               {'name': 'Pang Pang', 'title': 'engineer'},
    //               {'name': 'Xiang Xiang', 'title': 'UE engineer'}
    //             ]
    //           }
    //         ]
    //       },
    //       {'name': 'Hong Miao', 'title': 'department manager'},
    //       {'name': 'Chun Miao', 'title': 'department manager'}
    //     ]
    //   })
    // }
    //
    let temp = data
    for (let i = 0; i < 10; i++) {
      if (!temp.children) {
        temp.children = []
      }
      temp.children.push({
        'name': 'Lao Lao',
        'title': 'general manager',
        'children': [
          {'name': 'Bo Miao', 'title': 'department manager'},
          {
            'name': 'Su Miao',
            'title': 'department manager',
            'children': [
              {'name': 'Tie Hua', 'title': 'senior engineer'},
              {
                'name': 'Hei Hei',
                'title': 'senior engineer',
                'children': [
                  {'name': 'Pang Pang', 'title': 'engineer'},
                  {'name': 'Xiang Xiang', 'title': 'UE engineer'}
                ]
              }
            ]
          },
          {'name': 'Hong Miao', 'title': 'department manager'},
          {'name': 'Chun Miao', 'title': 'department manager'},
          {'name': 'Hong Miao', 'title': 'department manager'},
          {'name': 'Chun Miao', 'title': 'department manager'}
        ]
      })
      temp = temp.children[0]
    }

    data = this.d3.hierarchy(data)
    let tree = this.d3.tree()
      .size([this.width - this.padding, this.height - this.padding])
      .nodeSize([25, 100])
    this.update(tree, data)
  }

  update (tree, source) {
    let treeData = tree(source)
    let nodes = treeData.descendants()
    let links = treeData.links()
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
      .style('visibility', 'hidden')
    this.context = this.canvasNode.node().getContext('2d')
    // this.context.translate(this.width / 2, this.padding)
    this.hiddenContext = this.hiddenCanvasNode.node().getContext('2d')
  }

  initVirtualNode () {
    let virtualContainer = document.createElement('root')
    this.virtualContainerNode = this.d3.select(virtualContainer)
    this.colorNodeMap = {}
  }

  drawCustom (data) {
    let scale = this.d3.scaleLinear()
      .range([10, 390])
      .domain([1, 23])
    let dataBinding = this.virtualContainerNode.selectAll('.node')
      .data(data, d => d)

    dataBinding.enter()
      .append('custom')
      .attr('class', 'orgUnit')
      .attr('x', scale)
      .attr('y', 0)
      .attr('size', 15)
      .attr('fillStyle', 'pink')
      .transition()
      .duration(1000)
      .attr('size', 8)
      .attr('y', 100)
      .attr('fillStyle', 'red')

    this.addColorKey()

    let self = this
    this.d3.timer(function () {
      self.drawCanvas()
    })
  }

  addColorKey () {
    // give each node a unique color
    let self = this
    this.virtualContainerNode.selectAll('.orgUnit')
      .each(function () {
        let node = self.d3.select(this)
        let newColor = OrgChart.randomColor()
        while (self.colorNodeMap[newColor]) {
          newColor = OrgChart.randomColor()
        }
        node.attr('colorKey', newColor)
        self.colorNodeMap[newColor] = node
        console.log('color: ' + node.attr('colorKey'))
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
        self.context.fillStyle = 'steelblue'
        self.context.arc(node.attr('x'), node.attr('y'), self.unitWidth, 0, 2 * Math.PI)
        self.context.fill()
        self.context.closePath()

        self.context.beginPath()
        self.context.fillStyle = 'white'
        self.context.arc(node.attr('x'), node.attr('y'), self.unitWidth - 2, 0, 2 * Math.PI)
        self.context.fill()
        self.context.closePath()
      })
  }

  drawHiddenCanvas () {
    this.hiddenContext.fillStyle = '#fff'
    this.hiddenContext.rect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))
    this.hiddenContext.fill()

    let self = this
    this.virtualContainerNode.selectAll('.orgUnit')
      .each(function () {
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
      let colorStr = '#' + OrgChart.appendFront0(pixelData[0].toString(16)) +
        OrgChart.appendFront0(pixelData[1].toString(16)) +
        OrgChart.appendFront0(pixelData[2].toString(16))
      let node = self.colorNodeMap[colorStr]
      if (node) {
        node.transition()
          .duration(1000)
          .attr('fillStyle', OrgChart.randomColor())
      }
    })
  }

  bigger () {
    this.context.clearRect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))
    this.context.scale(2, 2)
  }

  smaller () {
    this.context.clearRect(0, 0, this.canvasNode.attr('width'), this.canvasNode.attr('height'))
    this.context.scale(0.5, 0.5)
  }

  static appendFront0 (numStr) {
    if (numStr.length !== 2) {
      return '0' + numStr
    } else {
      return numStr
    }
  }

  static randomColor () {
    let letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
}

export default OrgChart
