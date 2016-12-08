import path from 'path';

module.exports = {
  "extends": "airbnb",
  "plugins": ["import"],
  "rules": {
    "import/no-extraneous-dependencies": "off"
  },
  "settings": {
      "import/resolver": {
      "webpack": {
        "config": path.join(__dirname, 'webpack.config.babel.js')
      }
    }
  }
}
