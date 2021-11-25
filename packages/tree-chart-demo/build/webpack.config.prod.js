const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(require('./webpack.config.base'), {
  mode: 'production',
  devtool: 'source-map',
  output: {
    publicPath: './'
  },
  optimization: {
    minimize: true
  }
})
