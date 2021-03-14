const webpack = require('webpack');
const path = require('path');
const { argv } = require('process');

console.log(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
    entry: './src/app.js',
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
    ]
};

module.exports = config;