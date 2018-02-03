const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'Webpack Boilerplate';

/**
 * Webpack Configuration
 */
module.exports = {
    entry: [
        'bootstrap-loader',
        'font-awesome/scss/font-awesome.scss',
        path.join(dirApp, 'index')
    ],
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: appHtmlTitle
        }),

        new ExtractTextPlugin("css/styles.css")
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // SCSS
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                              sourceMap: IS_DEV
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: IS_DEV
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: IS_DEV,
                                includePaths: [dirAssets]
                            }
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: "./assets/styles/sass-resources.scss"
                            }
                        }
                    ]
                  })
              },

            // EJS
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },

            // FONTS
            {
              test: /\.(eot|ttf|woff|woff2|svg)$/,
              exclude: /images/,
              loader: 'file-loader?name=/fonts/[name].[ext]'
            },

            // FONT_AWESOME
            {
              test: /font-awesome\.config\.js/,
              use: [
                { loader: 'style-loader' },
                { loader: 'font-awesome-loader' }
              ]
            },
        ]
    }
};
