const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')

module.exports = env => merge(common(env), {
	plugins: [
        new UglifyJSPlugin(),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
        new StyleExtHtmlWebpackPlugin()
	]
});
