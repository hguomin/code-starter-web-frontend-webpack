const webpack = require('webpack');
const path = require('path');
const { argv } = require('process');

console.log(__dirname);

const config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    }
};

module.exports = config;