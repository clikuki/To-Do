const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js',
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'To-Dos',
			template: './src/template.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		})
	],
	module: {
	  	rules: [
			{
		  		test: /\.css$/i,
		  		use: [
			  		MiniCssExtractPlugin.loader, "css-loader"
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/[name][ext]'
				}
			},
		]
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
};