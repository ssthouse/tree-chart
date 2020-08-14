<template>
  <div class="container">
    <h3>基本使用</h3>

    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray;"
      :dataset="sampleData"
      :config="treeConfig"
    >
    </vue-tree>

    <h3>异化展示折叠节点</h3>

    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray;"
      :dataset="sampleData"
      :config="treeConfig"
    >
      <template v-slot:node="{ node, collapsed }">
        <span
          class="tree-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
          >{{ node.value }}</span
        >
      </template>
    </vue-tree>

    <h3>富媒体树状图</h3>
    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray;"
      :dataset="richMediaData"
      :config="treeConfig"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <img
            :src="node.avatar"
            style="width: 48px; height: 48px; border-raduis: 4px;"
          />
          <span style="padding: 4px 0; font-weight: bold;"
            >能力值{{ node.value }}</span
          >
        </div>
      </template>
    </vue-tree>

    <h3>直线连接</h3>
    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray;"
      :dataset="richMediaData"
      :config="treeConfig"
      linkStyle="straight"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <img
            :src="node.avatar"
            style="width: 48px; height: 48px; border-raduis: 4px;"
          />
          <span style="padding: 4px 0; font-weight: bold;"
            >能力值{{ node.value }}</span
          >
        </div>
      </template>
    </vue-tree>

    <h3>横向树状图</h3>
    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray;"
      :dataset="richMediaData"
      :config="treeConfig"
      direction="horizontal"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <img
            :src="node.avatar"
            style="width: 48px; height: 48px; border-raduis: 4px;"
          />
          <span style="padding: 4px 0; font-weight: bold;"
            >能力值{{ node.value }}</span
          >
        </div>
      </template>
    </vue-tree>

    <h3>缩放</h3>
    <div style="display: flex;">
      <v-btn @click="controlScale('bigger')">+</v-btn>
      <v-btn @click="controlScale('smaller')">-</v-btn>
      <v-btn @click="controlScale('restore')">1:1</v-btn>
    </div>
    <vue-tree
      ref="scaleTree"
      style="width: 800px; height: 600px; border: 1px solid gray;"
      :dataset="richMediaData"
      :config="treeConfig"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <img
            :src="node.avatar"
            style="width: 48px; height: 48px; border-raduis: 4px;"
          />
          <span style="padding: 4px 0; font-weight: bold;"
            >能力值{{ node.value }}</span
          >
        </div>
      </template>
    </vue-tree>
  </div>
</template>

<script>
import VueTree from '../vue-tree/VueTree.vue'

export default {
  name: 'treemap',
  components: { 'vue-tree': VueTree },
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
          'https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female3.svg',
        children: [
          {
            name: 'Bob',
            value: 400,
            avatar:
              'https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male4.svg',
            children: [
              {
                name: 'C1',
                value: 100,
                avatar:
                  'https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female4.svg'
              },
              {
                name: 'C2',
                value: 300,
                avatar:
                  'https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg'
              },
              {
                name: 'C3',
                value: 200,
                avatar:
                  'https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg'
              }
            ]
          },
          {
            name: 'Smith',
            value: 200,
            avatar:
              'https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg',
            children: [
              {
                name: 'S1',
                value: 230,
                avatar:
                  'https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female1.svg'
              }
            ]
          },
          {
            name: 'Jackson',
            value: 300,
            avatar:
              'https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female3.svg'
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
