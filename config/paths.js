'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  buildv2: path.resolve(__dirname, '../build-v2'),
  buildv3: path.resolve(__dirname, '../build-v3'),
  manifestv2: path.resolve(__dirname, '../src/manifest-v2/manifest.json'),
  manifestv3: path.resolve(__dirname, '../src/manifest-v3/manifest.json'),
};

module.exports = PATHS;
