const webpack = require('webpack');
const path = require('path');
const { argv } = require('process');

console.log(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            title: 'Code starter for web frontend',
            inject: 'body',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                //for ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader', 
            }
        ]
    }
};

module.exports = config;