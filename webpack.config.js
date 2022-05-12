const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    entry: {
        ui: './src/client/index.tsx', // The entry point for your UI code
        code: './src/app/app.ts', // The entry point for your app code
    },

    module: {
        rules: [
            // Converts TypeScript code to JavaScript
            {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},

            // Enables including CSS by doing "import './file.css'" in your TypeScript code
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            // Allows you to use "import logo from './logo.svg'" in your HTML code to get a data URI
            {test: /\.(png|jp(e*)g|gif|webp|svg)$/, use: [{loader: 'url-loader'}]},
        ],
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {extensions: ['.tsx', '.ts', '.jsx', '.js']},

    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    },

    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
            filename: 'ui.html',
            inlineSource: '.(js)$',
            inject: 'body',
            cache: false,
            chunks: ['ui'],
        }),
        new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    ],
})