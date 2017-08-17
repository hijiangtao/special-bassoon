/*
 * @Author: Joe Jiang 
 * @Date:   2017-08-17 22:27:33 
 * @Last Modified by: Joe Jiang
 * @Last Modified time: 2017-08-17 23:21:00
 */

var path = require('path');


module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
}