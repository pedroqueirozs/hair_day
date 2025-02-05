const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPluin = require("copy-webpack-plugin");

module.exports = {
  target: "web",
  mode: "development",

  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    liveReload: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      favicon: path.resolve("src", "assets", "scissors.svg"),
    }),
    new CopyWebpackPluin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"), //copiar de //
          to: path.resolve(__dirname, "dist", "src", "assets"), //pasta que vai as copias//
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/, //Essa é uma regra para pegar todos os arquivos .cc
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
