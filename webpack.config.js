const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var webpack = require('webpack');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js'
  },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },
        {
          test: /\.njk$/,
          loader: 'file?&name=[path][name].html!nunjucks-html?' +
            JSON.stringify({
              'searchPaths': [
              '/src',
              '/build'
            ]
          })
      }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [
        extractSass
    ]
};
