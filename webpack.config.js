var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        'babel-polyfill',
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader', 'babel-loader']
            }, {
                test: /\.css$/,
                loader: 'style-loader',
                include: /src/,
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                include: /src/,
                query: {
                    modules: true,
                    localIdentName: '[name]-[local]--[hash:base64:5]'
                }
            }
        ],
    },
    resolve: {
		extensions: ['.js', '.jsx']
	},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}