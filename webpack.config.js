const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = 3001;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
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
    compress: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin(
    {
      inject: true,
      templateContent:
        `<html>
<body>
  <div id="root"></div>
  <script src="/dist/bundle.js"></script>
</body>
</html>`
    }
  )]
};