const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

let config = {
  mode: process.env.NODE_ENV,
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: './app.legacy.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ],
  devtool: ''
}

module.exports = config
