<template>
  <div>
    <h1>Vue3</h1>

    <button @click="onChangeDataset">change dataset</button>

    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray"
      :dataset="sampleData"
      :config="treeConfig"
    />
  </div>
</template>

<script>
import VueTree from "./vue-tree/VueTree.vue";

export default {
  components: { VueTree },
  data() {
    return {
      showTree: false,
      sampleData: {
        value: "1",
        children: [
          { value: "2", children: [{ value: "4" }, { value: "5" }] },
          { value: "3" },
        ],
      },
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 },
    };
  },
  methods: {
    onChangeDataset() {
      this.sampleData = {
        value: "100",
        children: [
          { value: "200" },
          { value: "300", children: [{ value: "400" }, { value: "500" }] },
        ],
      };
    },
    onClick() {
      this.showTree = true;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
