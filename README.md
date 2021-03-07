# code-starter-web-frontend-webpack
The web frontend starter project with webpack and typescript

## STEP-1: Create minimal webpack project
1. Init project folder
    ```bash
    npm init
    ```
2. Install Webpack
    ```bash
    npm install webpack webpack-cli --save-dev
    ```
3. Add webpack.config.js and add minimal settings 
    ```javascript
    const webpack = require('webpack');
    const path = require('path');
    const config = {
        entry: './src/app.js',
        output: {
        path: path.resolve(__dirname, 'dist'),
            filename: 'app.bundle.js'
        }
    };
    module.exports = config;
    ```
4. Add src/app.js
    ```javascript
    window.onload = function(){
        document.write("hello world.");
    }
    ```
5. Add dist/index.html
    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <title>Frontend empty project</title>
            <meta charset="utf-8">
        </head>
        <body>
            <div id="app"></div>
            <script src="app.bundle.js"></script>
        </body>
    </html>
    ```
6. Add webpack build command to the scripts section in package.json
    ```json
    "scripts": {
        "build": "webpack",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```
7. Test this simplest webpack project
    ```bash
    npm run build
    ```
    then open the dist\index.html in any browser to see result, you should see the "hello world" in the page

## STEP-2: Add multiple bundle environment support
1. Move the content of the STEP-1 webpack.config.js a new created webpack.common.js, this file will contain common configuration in all environment
2. Change webpack.config.js to load different environment configuration by exporting a configuration function as below:
    ```javascript
    const common = require("./webpack.common");
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

        return merge(common, require(`./webpack.${argv.mode}`));
    };
    ```
3. Create a new webpack.development.js for development specific configuration
    ```javascript
    console.log("development environment...");
    module.exports = {
    
    }
    ```
4. Create a new webpack.production.js for production specific configuration
    ```javascript
    console.log("production environment...");
    module.exports = {

    }
    ```
5. Change the build commands in scripts section in package.json
    ```bash
    "scripts": {
        "build": "webpack --mode=production",
        "debug": "webpack --mode=development",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

## SETP-3: Use Dev Server
1. Add webpack-dev-server dependency
    ```bash
    npm install webpack-dev-server --save-dev
    ```
2. Add dev server configuration in .webpack/webpack.common.js
    ```javascript
    module.exports = {
    //...
    devServer: {
            contentBase: path.join(__dirname, 'dist'),
            hot: true,
            open: true,
            compress: true,
            port: 8888,
        },
    };
    ```
3. Change the build commands in scripts section in package.json
    ```bash
    "scripts": {
        "build": "webpack --mode=production",
        "debug": "webpack serve --mode=development",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```
    it use the 'webpack serve' to start webpack-dev-server
4. Run 'npm run debug' to start, it will open localhost:8888 automatically in browser

## SETP-4: Add application configurations
1. Use this web site to get such configuration: https://createapp.dev/webpack
