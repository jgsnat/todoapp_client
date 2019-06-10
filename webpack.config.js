const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

	entry: './src/index.js',

	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new webpack.ProgressPlugin(), 
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/index.html')
		}),
		new MiniCssExtractPlugin({filename: "[name]-[contenthash:8].css"})
	],

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						],
						['@babel/preset-react']
					]
				}
			},
			{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
					'css-loader',
					'style-loader'
                ]
            }
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true
	}
};
