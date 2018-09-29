const webpack = require('webpack')
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

let config = {
  mode: process.env.NODE_ENV,
  entry: ['./src/index.js', './assets/stylesheets/styles.scss', './assets/images/logo-obsidian.png', './src/html/index.html'],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: './app.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: [{
          loader: 'file-loader',
          options: {
            name: './img/[name].[ext]'
          }
        },
        'img-loader']
      },
      {
        test: /\.(html?)$/,
        loaders: [{
          loader: 'file-loader',
          options: {
            name: './[name].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|ttf)$/,
        loaders: [{
          loader: 'url-loader',
          options: {
            name: './fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader']
        }))
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('app.css'),
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    inline: true,
    open: false,
    hot: true
  }
}
module.exports = config
