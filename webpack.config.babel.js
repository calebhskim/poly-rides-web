import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  devtoo: 'eval-source-map',
  entry: ['./src/client.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/'
  },
  devServer: {
    stats: 'errors-only'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react-native' ]
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // note(ckim): Change to use { enforce: 'pre' ... } when upgrading webpack
        loader: 'eslint-loader',
        query: {
          presets: [ 'es2015' ]
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE': JSON.stringify('development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html'  
    }),
  ]
};
