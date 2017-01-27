import path from 'path';

module.exports = {
  "extends": "airbnb",
  "plugins": ["import"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "import/no-extraneous-dependencies": "off",
    "jsx-quotes": ["error", "prefer-single"],
    "keyword-spacing": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "space-before-function-paren": "off",
  },
  "settings": {
      "import/resolver": {
      "webpack": {
        "config": path.join(__dirname, 'webpack.config.babel.js')
      }
    }
  }
}
