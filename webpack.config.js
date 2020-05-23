const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = 3001;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://0.0.0.0:${port}`, // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    "./src/index.js",
  ],
  mode: "development",
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
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== 'production',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      },
      {
        test: /\.(webm)$/i,
        use: [
          {
            loader: 'file-loader',
            // options: {
            //   publicPath: 'assets',
            // },
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
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
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
  <script src="/dist/bundle.js"></script>
</body>
</html>
`
      }
    )]
};