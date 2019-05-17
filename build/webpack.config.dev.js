const {version} = require('../package.json'),
  path = require('path'),
  webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/js/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    fileName: 'js/[name].js'
  },
  module: {
    rules: [{

    }]
  },
  plugins: [
    new CleanWebpackPlugin([
      path.resolve(__dirname, './dist'),
      path.resolve(__dirname, './dist.zip')
    ]),
    new webpack.BannerPlugin(`v-${version}, by Cai Jieying`),
    new HtmlWebpackPlugin()
  ]
}