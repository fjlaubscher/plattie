require('dotenv').config();
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const publicPath = process.env.PUBLIC_URL || '/';
const buildPath = path.join(__dirname, '..', 'build');
const assetsPath = path.join(__dirname, '..', 'src', 'assets');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    path: buildPath,
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(png|jpg|gif|json)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new CopyWebpackPlugin([{ from: assetsPath, to: buildPath }]),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      publicPath
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
