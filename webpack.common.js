const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  target: "web",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Snake",
      favicon: "src/assets/favicon.ico",
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
