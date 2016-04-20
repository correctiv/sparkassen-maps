var webpack = require('webpack');

// postcss plugins
// var cssimport = require('postcss-import');
// var customProperties = require('postcss-custom-properties');
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');
// var cssnested = require('postcss-nested');

module.exports = {
  entry: {
    app : ['./src/index.js']
  },
  output: {
    path: __dirname + '/build/',
    filename: 'bundle.js'
  },
  devtool: 'eval',
  debug: true,
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riotjs',
        query: {
          type: 'none'
        }
      }
    ],
    loaders: [
      {
        test: /\.js|\.tag$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: "style!css!less"
        // loader: "style!css!less!postcss"
      }
      // { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }
    ]
  },
  postcss: [autoprefixer, csswring],
  devServer: {
    contentBase: './build/',
    port: 4000,
    hot: true,
    inline: true
  }
};
