# Canvas Tree Chart

## Canvas 版本 使用到的技术点

- 将 D3.js 和 Canvas 一起使用,提升绘制效率(其中 D3.js 使用虚拟 DOM 就行渲染,Canvas 取虚拟 DOM 节点坐标进行绘制)
- 使用 `唯一颜色值`的方案,实现 Canvas 上点击事件的监听 (你也可以参考这篇文档了解其详细实现: https://medium.com/@lverspohl/how-to-turn-d3-and-canvas-into-good-friends-b7a240a32915)

## Canavs API

canvas 的版本, 因为其绘制过程较难抽象, 且仅仅在数据量较大的情况下才有意义,所以没有发布为 npm module.

如果你希望使用 canvas 版本的 tree-chart,可以将源代码下载下来,并进行一下步骤替换为自己的数据集:

- 将 `packages/tree-chart-demo/src/base/data-generator.js`文件中的数据替换为你自己的数据.
- 在 `packages/tree-chart-demo/src/components/org-chart.js`文件中,修改`drawShowCanvas`函数的绘制逻辑.
