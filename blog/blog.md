# D3.js + Canvas 绘制组织结构图

### 使用 D3.js 默认的 svg 渲染
D3默认的树状图画图使用的是svg, 比如这个来自D3作者的例子:

https://bl.ocks.org/mbostock/4339083

使用svg有好有坏:
- 好处是方便操作dom元素, 添加用户交互
- 坏处是渲染效率不高, 在数据量较大时页面易掉帧, 卡顿

在大多数数据量不是特别大情况下, 使用svg的好处是远远盖过坏处的,但如果我们真的需要渲染大量的数据呢?


### 使用 D3.js + Canvas 渲染

#### source code
https://github.com/ssthouse/organization-chart

#### demo page
https://ssthouse.github.io/organization-chart/#/


![demo gif](https://raw.githubusercontent.com/ssthouse/organization-chart/master/screenshots/org-chart.gif)


上面的demo就是使用 D3.js + Canvas 的方式实现的, 在组织的层数超过300时才会出现明显的卡顿, 能满足大部分的组织结构图的数据.

### 思路
- use D3.js with Canvas to draw organizationChart more efficiently.
- Use `unique-color` manner to identify mouse click event in Canvas (you can refer to https://medium.com/@lverspohl/how-to-turn-d3-and-canvas-into-good-friends-b7a240a32915 to see detail)


### To draw your own nested data

please replace the data in `/src/base/data-generator` with your own nested data.

please add your data drawing logic in `/src/components/org-chart.js #drawShowCanvas`

### Want develop locally ?

#### source code
https://github.com/ssthouse/organization-chart

``` bash
# install dependencies
npm install

# serve with hot reload at localhost
npm run dev

# build for production with minification (build to ./docs folder, which can be auto servered by github page 🤓)
npm run build
```
