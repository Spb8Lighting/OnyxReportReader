const webpack = require('webpack')
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  mode: process.env.NODE_ENV,
  entry: {
    app: ['./src/index.js', './assets/stylesheets/styles.scss', './assets/images/M1.svg', './assets/images/M-Touch.svg', './assets/images/M-Play.svg', './assets/images/Onyx-Report-Reader.svg', './assets/images/close.svg', './assets/images/settings.svg', './assets/images/changelog.svg', './assets/images/question.svg', './src/html/index.html', './src/manifest.json']
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: './[name].js'
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
        test: /\.json$/,
        type: 'javascript/auto',
        loaders: [{
          loader: 'file-loader',
          options: {
            name: './[name].[ext]'
          }
        }]
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
    new CopyWebpackPlugin([{ from: './assets/favicons', to: './public/img/favicons' }]),
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
