module.exports = function () {
    return require(`./conf/webpack.${process.env.NODE_ENV}.js`)
}
