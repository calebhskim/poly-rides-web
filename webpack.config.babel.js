import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './src/client.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/dist/'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // note(ckim): Change to use { enforce: 'pre' ... } when upgrading webpack
        loaders: ['react-hot', 'babel-loader', 'eslint-loader']
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html'  
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/images',
        to: 'dist',
      }
    ], {}),
  ]
};
