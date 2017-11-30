const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cleanTarget = ['dst'];

module.exports = {
 entry: ['./src/js/entry.js', './src/stylesheet/app.scss'],
 output: {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'dst')
 },
 resolve: {
  alias: {
   'src': path.resolve(__dirname, 'src')
  }
 },
 module: {
  rules: [
   { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
   {
    test: /\.(scss|css|sass)$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
   }
  ]
 },
 plugins: [
  new CleanWebpackPlugin(cleanTarget),
  new ExtractTextPlugin({
   filename: '[name].css',
   publicPath: path.resolve(__dirname, 'dst'),
   allChunks: true
  }),
  new HtmlWebpackPlugin({
   filename: path.resolve(__dirname, 'index.html'),
   inject: 'body',
   template: './src/html/index.html'
  })
 ]
}
