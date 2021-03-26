const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  target: 'browserslist',
  // plugins: [new BundleAnalyzerPlugin()]
});
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
