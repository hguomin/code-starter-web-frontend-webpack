const path = require('path');
console.log("development environment...");
module.exports = {
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        open: true,
        compress: true,
        port: 8888,
    },
}