let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let {resolve} = path;

module.exports = (env) => {
  // the env object is created from arguments of the webpack command
  // (e.g webpack --env.dev will produce env === {dev: true})



  let plugins = [

    // will extract inline css into separate 'styles.css'
    new ExtractTextPlugin('styles-[hash].css'),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: true,
    })
  ];

  let prodPlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        screw_ie8: true
      }
    })
  ];


  // BASIC SETTINGS
  const config = {
    entry: {
      javascript: ['./client/index.js']
    },
    output: {
      path: resolve('build'),
      publicPath: '/',
      filename: 'bundle-[hash].js'
    },
    resolve: {
      modules: [
        path.join(__dirname),
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    },
    plugins: plugins
  };

  // ENVIRONMENT-DEPENDENT SETTINGS


  if (env.prod) {
    plugins = plugins.concat(prodPlugins);
  } else {
    config.devtool = 'inline-source-map';
  }

  config.plugins = plugins;

  return config;
};
