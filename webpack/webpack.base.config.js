const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const loader = require('sass-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../build'),
  assets: 'assets/'
};

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {}
    },
    'css-loader'
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

module.exports = {
  context: PATHS.src,
  externals: {
    paths: PATHS
  },
  entry: {
    main: ['@babel/polyfill', './index.js']
  },
  output: {
    filename: `bundle.js`,
    path: PATHS.dist
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.json', '.png', '.jpg', ',sass', 'svg'],
    alias: {
      '~': PATHS.src,
      '@': `${PATHS.src}/js`
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: `style.css`
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.src}/${PATHS.assets}img`,
          to: `${PATHS.assets}img`
        }
      ]
    })
  ]
};
