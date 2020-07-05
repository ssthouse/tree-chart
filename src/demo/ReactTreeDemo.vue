<template>
  <div class="container">
    <h3>基本使用</h3>

    <h3>异化展示折叠节点</h3>

    <h3>富媒体树状图</h3>

    <h3>直线连接</h3>

    <h3>横向树状图</h3>

    <h3>缩放</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sampleData: {
        value: '1',
        children: [
          { value: '2', children: [{ value: '4' }, { value: '5' }] },
          { value: '3' }
        ]
      },
      richMediaData: {
        name: 'James',
        value: 800,
        avatar:
          'https://gravatar.com/avatar/db51fdaf64d942180b5200ca37d155a4?s=400&d=robohash&r=x',
        children: [
          {
            name: 'Bob',
            value: 400,
            avatar:
              'https://gravatar.com/avatar/16b3b886b837257757c5961513396a06?s=400&d=robohash&r=x',
            children: [
              {
                name: 'C1',
                value: 100,
                avatar:
                  'https://gravatar.com/avatar/4ee8775f23f12755db978cccdc1356d9?s=400&d=robohash&r=x'
              },
              {
                name: 'C2',
                value: 300,
                avatar:
                  'https://gravatar.com/avatar/d3efa8fa639bdada96a7d0b4372e0a96?s=400&d=robohash&r=x'
              },
              {
                name: 'C3',
                value: 200,
                avatar:
                  'https://gravatar.com/avatar/4905bc3e5dc51a61e3b490ccf1891107?s=400&d=robohash&r=x'
              }
            ]
          },
          {
            name: 'Smith',
            value: 200,
            avatar:
              'https://gravatar.com/avatar/d05d081dbbb513180025300b715d5656?s=400&d=robohash&r=x',
            children: [
              {
                name: 'S1',
                value: 230,
                avatar:
                  'https://gravatar.com/avatar/60c1e69e690d943c5dc06568148debc4?s=400&d=robohash&r=x'
              }
            ]
          },
          {
            name: 'Jackson',
            value: 300,
            avatar:
              'https://gravatar.com/avatar/581f7a711c815d9671c35ebd815ec1e4?s=400&d=robohash&r=x'
          }
        ]
      },
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }
    }
  },
  methods: {
    controlScale(command) {
      switch (command) {
        case 'bigger':
          this.$refs.scaleTree.zoomIn()
          break
        case 'smaller':
          this.$refs.scaleTree.zoomOut()
          break
        case 'restore':
          this.$refs.scaleTree.restoreScale()
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree-node {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: antiquewhite;
  text-align: center;
  line-height: 28px;
}

.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}

h3 {
  margin-top: 32px;
  margin-bottom: 16px;
}
</style>
