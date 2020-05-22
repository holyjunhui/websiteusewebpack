const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');


const webpackConfigDev = {
  mode: "development",
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    // 必须是pages下面的index文件 多页面那里配置的
    contentBase: path.join(__dirname, "../src/pages/index"),
    publicPath: "/",
    host: "127.0.0.1",
    port: "9527",
    overlay: true, // 浏览器页面上显示错误
    //服务器代理配置项
    proxy: {
      "/testing/*": {
        target: "https://www.baidu.com",
        secure: true,
        changeOrigin: true,
      },
    },
  },
};


module.exports = merge(webpackConfigBase, webpackConfigDev)