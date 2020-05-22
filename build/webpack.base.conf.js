const path = require("path")
const glob = require("glob")
const webpack = require("webpack");

const rules = require("./webpack.rules.conf.js")
// css 模版
const HtmlWebpackPlugin = require("html-webpack-plugin");


function getEntry() {
	const entry = {};
	const htmlWebpackPlugins = [];

	const entryFiles = glob.sync("./src/pages/**/index.js")
	// console.log("entryFiles",entryFiles);
	Object.keys(entryFiles)
		.map(index => {
			const entryFile = entryFiles[index];
			//'./src/pages/home/index.js'
			const match = entryFile.match(/src\/pages\/(.*)\/index\.js/)
			const pageName = match && match[1];

			entry[pageName] = entryFile;

			// console.log("match",match)
			// console.log("path.join",path.join(`src/${pageName}/index.html`),path.join(__dirname,`src/${pageName}/index.html`))
			htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: `src/pages/${pageName}/index.html`,
          filename:
            process.env.NODE_ENV === "development"
              ? `${pageName}.html`
              : `html/${pageName}.html`,
          chunks: [pageName],
          inject: true,
          minify:
            process.env.NODE_ENV === "development"
              ? false
              : {
                  html5: true,
                  collapseWhitespace: true,
                  preserveLineBreaks: false,
                  minifyCss: true,
                  minifyJs: true,
                  removeComments: false,
                },
        })
      );
		})
		return {
			entry,
			htmlWebpackPlugins
		}
}

const { entry, htmlWebpackPlugins } = getEntry()


module.exports = {
  entry: entry,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [...rules],
  },
  plugins: [
		        // 引入jquery
     new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery',
         'window.jQuery': 'jquery',
         Popper: ['popper.js', 'default']
     })
	].concat(htmlWebpackPlugins),
  // 提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: "initial",
          name: "vendor", // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10,
        },
        utils: {
          // 抽离自己写的公共代码，common这个名字可以随意起
          chunks: "initial",
          name: "common", // 任意命名
          minSize: 0, // 只要超出0字节就生成一个新包
          minChunks: 2,
        },
      },
    },
  },
};