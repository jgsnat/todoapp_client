const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    
    entry: './src/index.jsx',

    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },

    devServer: {
        port: 3000,
        contentBase: './public'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new ExtractTextPlugin('app.css')
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
                loader: 'file'
            }
        ]   
    }
}