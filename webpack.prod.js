const { merge } = require("webpack-merge")
const htmlWebpackPlugin = require("html-webpack-plugin")
const copyWebpackPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
process.env.NODE_ENV = "production"
const baseConfig = require("./webpack.common.js")


const prodConfig = merge(baseConfig, {
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new copyWebpackPlugin([
            "public"
        ]),
        new CleanWebpackPlugin()
    ]
})

module.exports = prodConfig