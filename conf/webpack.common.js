const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleTracker = require('webpack-bundle-tracker')
const bundles = require('./bundles.js')

const ENV = process.env.NODE_ENV

let config = {
    entry: bundles,
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'js/[name]-[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['babel-preset-env'],
                            plugins: ['babel-plugin-transform-object-rest-spread'],
                        }
                    },
                    { loader: 'eslint-loader' }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                css: ExtractTextPlugin.extract({
                                    fallback: 'vue-style-loader',
                                    use: 'css-loader'
                                }),
                                scss: ExtractTextPlugin.extract({
                                    fallback: 'vue-style-loader',
                                    use: ['css-loader', 'sass-loader']
                                })
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: ENV === 'prod'
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        }
                    ]
                })
            },
            {
                test: /\.s[a|c]ss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: ENV === 'prod'
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg|otf)$/i,
                loaders: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/images/',
                            publicPath: '/static/images/',
                            limit: 8192,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 65
                            },
                            pngquant: {
                                quality: '10-20',
                                speed: 4
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            },
                            gifsicle: {
                                optimizationLevel: 7,
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 7,
                                interlaced: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            outputPath: '/fonts/',
                            publicPath: '/static/fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(process.cwd(), 'src', 'assets'),
                to: 'assets'
            }
        ]),
        new BundleTracker({ filename: 'webpack-stats.json' }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/styles-[hash].css')
            }
        })
    ],
    resolve: {
        alias: {
            'src': path.join(process.cwd(), 'src')
        }
    }
}

module.exports = config
