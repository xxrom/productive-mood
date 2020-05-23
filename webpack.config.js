const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = 3001;

const isDev = process.env.NODE_ENV !== 'production';

console.log(`MODE: ${isDev ? 'Development' : 'Production'}`);

module.exports = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? 'eval' : 'source-map',
  entry: [
    `webpack-dev-server/client?http://0.0.0.0:${port}`, // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    "./src/index.js",
  ],
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }, {
          loader: 'linaria/loader',
          options: {
            sourceMap: false,
            cacheDirectory: '.linaria-cache',
            sourceMap: isDev,
          },
        }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(webm)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      react: path.resolve(__dirname, 'node_modules/react'),
    },
  },

  devServer: {
    port,
    publicPath: `http://localhost:${port}/dist/`,
    contentBase: path.join(__dirname, "dist/"),
    hotOnly: true,
    compress: true, // ???
    historyApiFallback: true, // ???
  },
  optimization: {
    noEmitOnErrors: true,
    minimize: !isDev
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(
      {
        inject: true,
        templateContent:
          `
<html>
<head>
  <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body style='margin: 0'>
  <div id="root"></div>
  <script src="/bundle.js"></script>
</body>
</html>
`
      }
    )]
};