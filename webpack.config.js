const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('font-awesome-webpack-4');

module.exports = {

	entry: './src/index.js',

	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.resolve(__dirname, 'dist')
	},

	resolve: {
        extensions: [".js",".jsx"]
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
				exclude: /node_modules/,
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
			},
			{ 
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: "url-loader?limit=10000&mimetype=application/font-woff" 
			},
      		{ 
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: "file-loader" 
			}
		]
	},

	devServer: {
		publicPath: "/",
        contentBase: "./dist",
        port: "3000",
        headers: { "Cache-Control": "max-age=600"},
        historyApiFallback: true
	}
};
