const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = env => {

    if (typeof env === "undefined" || typeof env.outputPath === "undefined")
        env = {...env, outputPath: path.resolve(__dirname, 'dist')};

    const outputPath = env.outputPath;

    return {
        entry: './src/app/index.jsx',
        output: {
            filename: 'bundle.js',
            path: outputPath,
            publicPath: "/"
        },
        plugins: [
            new CleanWebpackPlugin(outputPath, {allowExternal: true}),
            new HtmlWebpackPlugin({
                title: "Bubbles",
                template: "src/index.html",
                appMountId: "app",
                mobile: true
            }),
            extractSass,
            new webpack.optimize.ModuleConcatenationPlugin(),	 
        ],
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        use: [{
                            loader: "css-loader",
                            options: {
                                modules: true,
                                camelCase: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                includePaths: ['./node_modules']
                            }
                        }],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                },
		    {
			    test: /.jsx?$/,
			    loader: 'babel-loader',
			    exclude: /node_modules/,
			    query: {
				    presets: ['env', 'react']
			    }
		    }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"]
        }
    };
};

