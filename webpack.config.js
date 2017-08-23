const webpack = require('webpack');
const path = require('path');
const NodeSassLoader = require('node-sass-loader');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'dist/');
const APP_DIR = path.resolve(__dirname, 'src/');

NodeSassLoader.compile({ 
    source_directory: APP_DIR + '/scss',
    destination_directory: BUILD_DIR + '/css',
});

module.exports = {
	watch: true,
	cache: false,
	devtool: 'source-map',
	context: APP_DIR,
	entry: './index.js',
	output: {
		path: BUILD_DIR,
		filename: './js/bundle.js'
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
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader',
                include: APP_DIR + '/scss/',
				exclude: '/node_modules/'
            }
        ]
    },
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            cache: false,
            hash: true,
            template: APP_DIR + '/index.html'
        })
	]
};