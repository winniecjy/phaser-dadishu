const {version} = require('../package.json'),
  path = require('path'),
  webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWenpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, '../src/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules|lib/,
      loader: 'babel-loader'
    },{
      test: /\.s?css$/,
      use: [ // loader从后往前执行
        'style-loader', // 把样式插入到页面的style标签中
        'css-loader', // 遍历所有css文件，找到所有@import及url(.)并处理
        'postcss-loader', // 处理css文件，加前缀等
        'sass-loader' // 遍历scss/sass文件，处理为css文件
      ]
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'file-loader', // 处理文件名/文件路径，移动到打包后的目录下
      options: {
        name: '[name].[ext]',
        outputPath: 'img/'
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['../dist', '../dist.zip']
    }),
    new webpack.BannerPlugin(`v-${version}, by Cai Jieying`),
    new webpack.ProvidePlugin({
      $: path.resolve(__dirname, '../src/lib/zepto.js') 
    }),
    new CopyWenpackPlugin([{
      from: '../src/lib/phaser.min.js',
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
}