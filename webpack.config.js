const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')
module.exports = {
  devServer: {
    port: 3000,
    inline: true,
    hot: true,
    stats: 'normal',
    index: 'index.html',
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": 'GET, PUT, DELETE, PATCH, OPTIONS',
      "Access-Control-Allow-Headers": 'content-type, Authorization, X-Requested-With',

      }
  },
  entry: './src/index',
  output: {
    path: resolve(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
            },
            "sass-loader"
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/public', 'index.html'),
    }),
    new ExtractTextPlugin("style.css"),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
}