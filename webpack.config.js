const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'dist/js/');
const APP_DIR = path.resolve(__dirname, 'src/');

module.exports = {
	watch: true,
	cache: false,
	devtool: 'source-map',
	context: APP_DIR,
	entry: './index.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: [ '.js' ],
		modules: [ "node_modules" ]
	},
	module: {
        loaders: [
            {
                test: /\.js|.jsx?$/,
                loader: 'babel-loader',
                include: APP_DIR,
                exclude: /(node_modules)/
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss-loader!sass',
                include: APP_DIR + '/scss/',
				exclude: /(node_modules)/
            }
        ]
    },
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
            filename: BUILD_DIR + "css/style.css",
        }),
        new HtmlWebpackPlugin({
            cache: false,
            hash: true,
            template: APP_DIR + '/index.html'
        })
	]
};