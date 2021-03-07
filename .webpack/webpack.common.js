const webpack = require('webpack');
const path = require('path');
const { argv } = require('process');


const config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    }
};

module.exports = config;