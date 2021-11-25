const merge = require('webpack-merge')

module.exports = merge(require('./webpack.config.base'), {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devtool: 'source-map'
})
