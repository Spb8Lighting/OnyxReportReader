const webpack = require('webpack')
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const IsDev = (process.env.NODE_ENV == 'development') ? true : false

let config = {
    mode: process.env.NODE_ENV,
    entry: ['./src/index.js', './assets/stylesheets/styles.scss', './assets/images/logo-obsidian.png'],
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
                test: /\.(woff2?)$/,
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
    plugins: [
        new ExtractTextWebpackPlugin('app.css'),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        historyApiFallback: true,
        inline: true,
        open: false,
        hot: true
    },
    devtool: 'eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJSPlugin(),
        new OptimizeCSSAssets()
    );
} else {
    module.exports = config;
}