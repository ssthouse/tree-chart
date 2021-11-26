
<template>
  <div>
    <button @click="onClick">11</button>

    <vue-tree
      v-if="showTree"
      style="width: 800px; height: 600px; border: 1px solid gray"
      :dataset="sampleData"
      :config="treeConfig"
    />
  </div>
</template>
<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import VueTree from 'vue3-tree-chart'

export default {
  components: { VueTree },
  data() {
    return {
      showTree: false,
      sampleData : {
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
    onClick () {
      this.showTree = true;
    },
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
