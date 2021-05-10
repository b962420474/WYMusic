const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
process.env.NODE_ENV = 'production'
const baseConfig = require('./webpack.common.js')

const prodConfig = merge(baseConfig, {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'dist/public')
      }
    ]),
    new CleanWebpackPlugin()
  ]
})

module.exports = prodConfig
