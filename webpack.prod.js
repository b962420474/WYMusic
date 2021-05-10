const { merge } = require("webpack-merge")
const copyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require('path')
process.env.NODE_ENV = "production"
const baseConfig = require("./webpack.common.js")

const prodConfig = merge(baseConfig, {
  plugins: [
    new copyWebpackPlugin([
        {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist/public')
        }
    ]),
    new CleanWebpackPlugin()
    ]
})

module.exports = prodConfig
