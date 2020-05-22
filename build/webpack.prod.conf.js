const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
// 清除目录等
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpackConfigBase = require('./webpack.base.conf');
// 压缩css
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//压缩js 
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpackConfigProd = {
  output: {
    path: path.resolve(__dirname, "../dist"),
    // 打包多出口文件
    filename: "js/[name].[hash].js",
    publicPath: "../",
  },
  mode: "production",
  devtool: "cheap-module-eval-source-map",
  plugins: [
    //清除dist文件
    new CleanWebpackPlugin(),
    // 分离css插件参数为提取出去的路径
    new extractTextPlugin({
      filename: "css/[name].[hash:8].min.css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
		//上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					drop_debugger: false,
					drop_console: true
				}
			}
		})
  ],
};

module.exports = merge(webpackConfigBase, webpackConfigProd);
