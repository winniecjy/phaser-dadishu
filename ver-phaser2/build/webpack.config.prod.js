const path = require('path'),
  merge = require('webpack-merge'),
  base = require('./webpack.config.base'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  FilemanagerWebpackPlugin = require('filemanager-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.s?css$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        {
          loader: 'css-loader'
        },
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyWebpackPlugin([{
      from: 'src/lib/phaser.min.js',
      to: '../dist/js',
    }, {
      from: 'src/img',
      to: '../dist/img',
      ignore: ['.gitkeep']
    }]),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      },
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new FilemanagerWebpackPlugin({
      onEnd: [{
        archive: [{
          source: path.resolve(__dirname, '../dist'),
          destination: path.resolve(__dirname, '../dist.zip')
        }]
      }]
    })
  ]
});