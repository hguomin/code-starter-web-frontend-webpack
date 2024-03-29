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
2. Add dev server configuration in .webpack/webpack.development.js
    ```javascript
    const path = require('path');
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

## STEP-4: Generate the index.html with "html-webpack-plugin" based on the source html template
1. Install html-webpack-plugin plugin
    ```bash
    npm install html-webpack-plugin --save-dev
    ```
2. Add below configuration section to webpack.common.js
    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const config = {
        ...
    	plugins: [
	        new HtmlWebpackPlugin({
	            template: './src/index.html',
	            filename: 'index.html',
	            title: 'Code starter for web frontend',
	            inject: 'body',
	    }),
        ...
    ]
    ```

3. Put the index.html file from ./dist folder to the ./src folder
4. Delete below line from index.html, this will be automatically injected by the plugin "html-webpack-plugin"
    ```html
    <script src="app.bundle.js"></script>
    ```
5. Run 'npm build' commond will generate both of the app.bundle.js and index.html as output files

## STEP-5: Use Typescript for development
1. Add typescript development tools
    ```bash
    npm install --save-dev typescript babel-loader  @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript
    ```
    Here we use typescript for type checking, and use babel to compile typescritp to javascript

2. Create initial configuration for typescript
    ```bash
     tsc --init --declaration --allowSyntheticDefaultImports --noEmit --sourceMap --target esnext --outDir "dist"
    ```
3. Add babel-loader configuration to webpack.common.js to compile .ts file, also change the entry configuration
    ```javascript
    const config = {
        entry: './src/app.ts',
        ...
    	resolve: {
	        extensions: ['.ts', '.tsx', '.js', '.json']
	    },
	    module: {
	        rules: [
	            {
	                // Include ts, tsx, js, and jsx files.
	                test: /\.(ts|js)x?$/,
	                exclude: /node_modules/,
	                loader: 'babel-loader', 
	            }
	        ]
        }
    }
    ```

4. Rename ./src/app.js to ./src/app.ts to start typescript coding
5. How to use third-party javascript libraries?
Typescript needs to know the types of all objects in third party libraries, so we need to install their type definition, available type definitions can be seen here: https://www.npmjs.com/~types

    For example, to use JQuery:
    ```bash
     npm install @types/jquery
    ```
    
## STEP-6: Add application configurations
Use this web site to get such configuration: https://createapp.dev/webpack

Examples:
1. SCSS

    Install tools
    ```
    npm install --save-dev node-sass sass-loader css-loader style-loader
    ```

    Add below configuration to webpack.common.js
    ```javascript
    const config = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        }
    };
    ```

    Add a file named styles.scss in ./src as below:
    ```css
    $primary-color: white;
    $bg: black;
    h1 {
        color: $primary-color;
        background-color: $bg;
    }
    ```

    Change ./src/index.html as below:
    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <title>Empty project</title>
            <meta charset="utf-8">
        </head>
        <body>
            <div id="app">
                <h1>Hello Vue!</h1>
            </div>
            <!--script src="app.bundle.js"></script-->
        </body>
    </html>
    ```

    Import styles.scss in app.ts
    ```typescript
    import styles from  './styles.scss'
    ```

    that's it!

2. VUE

    Install vue and its dev tools:
    ```bash
    npm install vue --save
    npm install vue-loader vue-template-compiler --save-dev
    ```

    Add a file named App.vue to ./src as below:
    ```vue
    <template>
        <div>
            <h1>
            {{name}}
            </h1>
        </div>
    </template>

    <script lang="ts">
        import Vue from "vue";

        export default Vue.extend({
            data: function() {
                return {
                    name: 'Hello World!',
                }
            },
        });
    </script>
    ```

    Add below content to app.ts:
    ```typescript
    import Vue from 'vue';
    import App from './App';

    new Vue({
        el: '#app',
        render: h => h(App),
    });
    ```

    Add a new webpack configuration file named webpack.vue.js, copy and paste contents from webpack.common.js into it, now we will modify this file for vue
    
    Add or modify configurations as below:
    ```javascript
    const VueLoaderPlugin = require('vue-loader/lib/plugin');
    const config = {
        ...
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.(ts|js)x?$/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            [
                                '@babel/preset-typescript',
                                {
                                    allExtensions: true,
                                },
                            ],
                        ]
                    }
                }
            ]
        },
        plugins: [
            // make sure to include the plugin!
            new VueLoaderPlugin(),
            ...
        ],
    ```

    Use webpack.vue.js in webpack.config.js as below
    ```javascript
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
    ```



