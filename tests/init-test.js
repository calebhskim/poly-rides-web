/* eslint global-require: "ignore"*/

import path from 'path';

global.srcRequire = name => require(path.join(__dirname, name));
