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