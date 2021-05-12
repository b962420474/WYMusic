const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const config = require(`./config/${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}.js`)
module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/main.ts',
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name]-[contenthash:8].js' : '[name]-bulid.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.js|ts$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre' // 表示js最先使用eslint-loader
      },
      {
        test: /.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader'
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: { // less6.0后配置方式
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.svg|png|gif|jpg|jpeg|woff|ttf|woff2$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb  指定大小
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.less', '.css', '.json', '.ts', '.vue'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(), // 需单独配置webpack内置js压缩器
      new OptimizeCssAssetsWebpackPlugin()// 压缩单独的css,建议配在此处，不放在plugins中，
      // 使用此选项，还需要配置js压缩，不然js不会被压缩了
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'WYMusic'
    }),
    new webpack.DefinePlugin({
      BASE_URL: "''",
      'process.env': JSON.stringify(config)
    }),
    new MiniCssExtractPlugin()
  ]
}
