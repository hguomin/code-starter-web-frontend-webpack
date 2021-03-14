const path = require('path');
console.log("development environment...");
module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        open: true,
        compress: true,
        port: 8888,
    },
}