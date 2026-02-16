const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './web/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    compress: true,
    open: false,
    host: '0.0.0.0',
    allowedHosts: 'all',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js', '.json', '.jsx', '.tsx', '.ts'],
    alias: {
      'react-native': 'react-native-web',
      'react-native/Libraries/EventEmitter/NativeEventEmitter': 'react-native-web/dist/exports/EventEmitter',
    },
    fallback: {
      'react-native': false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
      filename: 'index.html',
    }),
  ],
  devtool: 'source-map',
};
