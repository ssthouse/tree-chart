const merge = require('webpack-merge')

module.exports = merge(require('./webpack.config.base'), {
  output: {
    publicPath: '/'
  },
  devtool: 'source-map'
})
