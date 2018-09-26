const webpack = require('webpack')
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const IsDev = (process.env.NODE_ENV == 'development') ? true : false

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
                    loader: IsDev ? 'url-loader' : 'file-loader',
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
                    use: ['css-loader', 'sass-loader', 'postcss-loader'],
                }))
            }
        ]
    },
    plugins: [],
    devtool: IsDev ? 'eval-source-map' : '',
    devServer : {
        contentBase: path.resolve(__dirname, './public'),
        historyApiFallback: true,
        inline: true,
        open: false,
        hot: true
    }
}

if (!IsDev) {
    config.plugins.push(
        new ExtractTextWebpackPlugin('app.css'),
        new UglifyJSPlugin(),
        new OptimizeCSSAssets(),
        new CleanWebpackPlugin(['./public'], {
            verbose: true,
            dry: false
        })
    )
} else {
    config.plugins.push(
        new ExtractTextWebpackPlugin('app.css'),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = config;