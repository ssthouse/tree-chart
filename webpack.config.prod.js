const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge({
  devtool: '#source-map',
  output: {
    publicPath: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})
// module.exports.devtool = '#source-map'
// // http://vue-loader.vuejs.org/en/workflow/production.html
// module.exports.plugins = (module.exports.plugins || []).concat([
//   new webpack.DefinePlugin({
//     'process.env': {
//       NODE_ENV: '"production"'
//     }
//   }),
//   new webpack.optimize.UglifyJsPlugin({
//     sourceMap: true,
//     compress: {
//       warnings: false
//     }
//   }),
//   new webpack.LoaderOptionsPlugin({
//     minimize: true
//   })
// ])
