## Demo 页面

https://ssthouse.github.io/vue-tree-chart/#/canvasOrgChart

## Demo 动图

![demo gif](https://raw.githubusercontent.com/ssthouse/organization-chart/master/screenshots/org-chart.gif)


## 使用到的技术点

### Canvas 版本

- 将D3.js和Canvas一起使用,提升绘制效率(其中D3.js使用虚拟DOM就行渲染,Canvas取虚拟DOM节点坐标进行绘制)
- 使用 `唯一颜色值`的方案,实现Canvas上点击事件的监听 (你也可以参考这篇文档了解其详细实现: https://medium.com/@lverspohl/how-to-turn-d3-and-canvas-into-good-friends-b7a240a32915)


### Svg 版本

- 使用D3.js计算**节点**和**链接线**的坐标
- 使用Vue控制DOM节点的变更
- 使用 Vue slot 抽象节点渲染流程, 让使用者可以高度定制化节点绘制

## 如何将图中数据替换为我的数据?

### Canavs 版本

canvas的版本, 因为其绘制过程较难抽象, 且仅仅在数据量较大的情况下才有意义,所以没有发布为npm module.

如果你希望使用canvas版本的tree-chart,可以将源代码下载下来,并进行一下步骤替换为自己的数据集:

- 将 `/src/base/data-generator.js`文件中的数据替换为你自己的数据.
- 在 `/src/components/org-chart.js`文件中,修改`drawShowCanvas`函数的绘制逻辑.

### Svg version

Svg版本通过Vue进行了良好的封装,使用起来非常方便且灵活.
#### 安装

执行下面的命令安装Svg版本的tree-chart

`npm install @ssthouse/vue-tree-chart`
#### 初始化

在项目中增加如下代码,初始化组件的引用


```javascript
```

####  具体使用

TODO: 待补充


## 开始开发

``` bash
# install dependencies
npm install

# serve with hot reload at localhost
npm run dev

# build for production with minification (build to ./docs folder, which can be auto servered by github page 🤓)
npm run build
```
