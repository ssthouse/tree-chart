import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import scss from 'rollup-plugin-scss'

const packageJson = require("./package.json");

export default {
  input: "./src/tree-chart/react-tree-chart.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
    scss(),
    // peerDepsExternal(),
    // resolve(),
    commonjs(),
  ]
};