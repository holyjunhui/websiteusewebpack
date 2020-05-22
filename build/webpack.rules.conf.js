const extractTextPlugin = require('extract-text-webpack-plugin')

const rules = [
  {
    test: /\.(css|scss|sass)$/,
    // 区分开发环境和生产环境，主要extractTextplugin 是可以提取css，加速运行
    use:
      process.env.NODE_ENV === "development"
        ? ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
        : extractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader", "postcss-loader"],
            publicPath: "../",
          }),
  },
  {
    test: /\.js$/,
    use: [
      {
        loader: "babel-loader",
      },
    ],
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        // 需要下载url-loader
        loader: "url-loader",
        options: {
          limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
          // 图片文件输出的文件夹
          publicPath: "../images",
          outputPath: "images",
        },
      },
    ],
  },
  // {
  //   test: /\.html$/,
  //   // html中的img标签
  //   use: {
  //     loader: "html-loader",
  //     options: {
  //       attrs: ["img:src", "img:data-src", "audio:src"],
  //       minimize: true,
  //     },
  //   },
  // },
  {
    test: /\.(eot|woff2?|ttf)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          name: "[name]-[hash:5].min.[ext]",
          limit: 3000, // size <= 3000B, 改成5000B试试?
          publicPath: "../fonts/",
          outputPath: "fonts/",
        },
      },
    ],
  },
  {
    test: /\.svg/,
    use: [
      {
        loader: "file-loader",
        options: {
          limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
          // 图片文件输出的文件夹
          publicPath: "../images",
          outputPath: "images",
        },
      },
    ],
  },
];

module.exports = rules;