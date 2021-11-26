import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: [
      // "@ssthouse/vue-tree-chart",
      // "@ssthouse/vue3-tree-chart"
    ]
  }
})
