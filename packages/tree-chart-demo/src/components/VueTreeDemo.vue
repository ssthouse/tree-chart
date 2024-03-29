<template>
  <div class="container">
    <h3>Basic usage | 基本使用</h3>

    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray;"
      :dataset="sampleData"
      :config="treeConfig"
    >
    </vue-tree>

    <h3>Show different style with folded nodes | 异化展示折叠节点</h3>

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

    <h3>Rich media tree chart | 富媒体树状图</h3>
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

    <h3>Link nodes with straight line | 直线连接</h3>
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

    <h3>Horizontal tree chart | 横向树状图</h3>
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

    <h3>Zoom in or out | 缩放</h3>
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

    <h3>
      Example of multiple parents with node collapse disabled |
      支持多父节点(禁用折叠)
    </h3>
    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray;"
      :dataset="vehicules"
      :config="treeConfig"
      :collapse-enabled="false"
      linkStyle="straight"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <span style="padding: 4px 0; font-weight: bold;"
            >能力值 {{ node.name }}</span
          >
        </div>
      </template>
    </vue-tree>

    <h3>
      Example of multi-root with changing dataset | 多根节点, 支持切换数据源
    </h3>
    <button type="button" class="changeDataset" v-on:click="clicked = !clicked">
      Change dataset
    </button>
    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray;"
      :dataset="multiRootChoice"
      :config="treeConfig"
      :collapse-enabled="true"
      linkStyle="straight"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <span style="padding: 4px 0; font-weight: bold;"
            >能力值 {{ node.name }}</span
          >
        </div>
      </template>
    </vue-tree>
  </div>
</template>

<script>
import VueTree from '@ssthouse/vue-tree-chart'

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
      vehicules: {
        name: 'Wheels',
        children: [
          {
            name: 'Wings',
            children: [
              {
                name: 'Plane'
              }
            ]
          },
          {
            name: 'Piston',
            customID: 3
          },
          {
            name: 'Carburetor',
            children: [
              {
                name: 'Truck',
                customID: 2
              },
              {
                name: 'Car',
                customID: 2
              }
            ]
          },
          {
            name: 'Valve',
            customID: 4
          },
          {
            name: 'Crankshaft',
            customID: 1
          }
        ],
        links: [
          { parent: 1, child: 2 },
          { parent: 3, child: 2 },
          { parent: 4, child: 2 }
        ],
        identifier: 'customID'
      },
      clicked: false,
      multiRoot1: [
        {
          name: 'Wheels',
          children: [
            {
              name: 'Wings',
              children: [
                {
                  name: 'Plane'
                }
              ]
            }
          ]
        },
        {
          name: 'Wings',
          children: [
            {
              name: 'Plane'
            }
          ]
        }
      ],
      multiRoot2: {
        name: 'Carburetor',
        children: [
          {
            name: 'Truck',
            customID: 2
          },
          {
            name: 'Car',
            customID: 2
          }
        ]
      },
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }
    }
  },
  computed: {
    multiRootChoice() {
      if (this.clicked) {
        return this.multiRoot2
      }
      return this.multiRoot1
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

.changeDataset {
  font-size: 1rem;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 10px 45px 10px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  margin: 1rem;
  position: relative;
  background-color: rgb(33, 150, 243);
  color: whitesmoke;
}
</style>
