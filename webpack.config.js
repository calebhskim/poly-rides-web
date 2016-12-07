module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/lib/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // note(ckim): Change to use { enforce: 'pre' ... } when upgrading webpack
        loader: [ 'babel-loader', 'eslint-loader' ],
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
  }
};
