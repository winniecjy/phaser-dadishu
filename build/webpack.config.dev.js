const merge = require('webpack-merge'),
  base = require('./webpack.config.base'),
  path = require('path'),
  CopyWenpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new CopyWenpackPlugin([{
      from: 'src/lib/phaser.min.js',
      to: 'js'
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../src'),
    compress: true, // 服务器资源采取gzip
    host: '0.0.0.0',
    port: 8081,
    hot: true,  // 热更新
    open: true, // 打开浏览器
    watchContentBase: true,
    watchOptions: {
        ignored: /node_modules/
    }
  }
})