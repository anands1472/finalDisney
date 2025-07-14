/* eslint-disable */

'use strict';

const path = require('path');
const config = require('config');
const contextRoot = config.has("APP_NAME") ? config.get("APP_NAME") : 'letterconnect';

module.exports = {
  root: path.resolve(__dirname, '../'),
  src: path.resolve(__dirname, '../', 'src'),
  outputPath: path.resolve(__dirname, '../', 'build/client'),
  outputDevPath: path.resolve(__dirname, '../', `build-dev/client`),
  entryPath: path.resolve(__dirname, '../', 'src/index.js'),
  templatePath: path.resolve(__dirname, '../', 'src/index.html'),
  imagesPath: path.resolve(__dirname, '../', 'src/images'),
  imagesFolder: `${contextRoot}/images`,
  fontsFolder: `${contextRoot}/fonts`,
  cssFolder: `${contextRoot}/fonts`,
  jsFolder: 'js',
  common: path.resolve(__dirname, '../', 'src/common'),
  imagesPublicPath: `/${contextRoot}/images`,
  fontPublicPath: `/${contextRoot}/fonts`
};
