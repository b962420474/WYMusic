const { merge } = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
process.env.NODE_ENV = 'development'
const baseConfig = require('./webpack.common.js')
const portfinder = require('portfinder')
const webpack = require('webpack')
const mockServer = require('./utils')
const path = require('path')
const devConfig = merge(baseConfig, {
  devServer: {
    hot: true,
    host: 'localhost',
    contentBase: 'public',
    port: '8080',
    before: app => {
      mockServer(path.resolve(__dirname, 'mock'), app)
    },
    proxy: {}
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.port = devConfig.devServer.port
  portfinder.getPort((error, port) => {
    if (error) {
      reject(error)
    } else {
      devConfig.devServer.port = port
      devConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devConfig.devServer.host}:${port}`]
        },
        onErrors: undefined
      }))
      resolve(devConfig)
    }
  })
})
