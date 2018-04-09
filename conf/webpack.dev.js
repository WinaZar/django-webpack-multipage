const CommonConfig = require('./webpack.common')
const Merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = Merge(CommonConfig, {
    devtool: '#cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: process.cwd()
        })
    ]
})
