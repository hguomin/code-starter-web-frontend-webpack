const common = require("./webpack.common");
const vue = require("./webpack.vue");
const { merge } = require("webpack-merge");

/*
 *env: { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true }
 *argv, all cli arguments: { mode: 'development', env: { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true } }
*/
module.exports = function(env, argv) {
    if(typeof argv.mode === 'undefined') {
        console.log('please specify the \'mode\' argument like \'--mode=production\'');
        return null;
    }

    //return merge(common, require(`./webpack.${argv.mode}`));
    return merge(vue, require(`./webpack.${argv.mode}`));
};