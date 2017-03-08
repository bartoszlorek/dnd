var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/lib/exporter.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'dnd.min.js',
        library: 'dnd',
        libraryTarget: 'umd'
    },
    externals: ['react', 'react-redux', 'redux'],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }, {
                test: /\.css$/,
                include: /src/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?modules=true&localIdentName=[hash:base64:5]'
                })
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new webpack.BannerPlugin('Copyright (c) 2017 Bartosz Lorek. MIT license')
    ]
}