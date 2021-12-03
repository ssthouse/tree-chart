
<template>
  <div>
    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray"
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
  </div>
</template>
<script>
import VueTree from "@ssthouse/vue3-tree-chart";
import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";

export default {
  components: { VueTree },
  data() {
    return {
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
};

// let sampleData =  {
//   value: "1",
//   children: [
//     { value: "2", children: [{ value: "4" }, { value: "5" }] },
//     { value: "3" },
//   ],
// };
// let treeConfig = { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 };
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
