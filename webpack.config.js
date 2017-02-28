// It's necessary to create not only JS file but also new HTML file:
var HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: __dirname + '/app/index.js',
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					//cacheDirectory: true,
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader"
				})
			},
		]
	},
	output: {
		filename: 'transformed.js',
		path: __dirname + '/build'
	},
	plugins: [
		HTMLWebpackPluginConfig,
		new ExtractTextPlugin('styles.css')
	]
};