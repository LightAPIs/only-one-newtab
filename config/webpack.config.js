'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

const CopyWebpackPlugin = require('copy-webpack-plugin');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      background: PATHS.src + '/background.js',
    },
    output: {
      path: PATHS['build' + env.manifest],
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: PATHS['manifest' + env.manifest],
            to: PATHS['build' + env.manifest],
          },
        ],
      }),
    ],
  });

module.exports = config;
