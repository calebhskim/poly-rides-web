import path from 'path';

module.exports = {
  entry: ['./src/index.web.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
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
  }
};
