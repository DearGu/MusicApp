var webpack = require('webpack');

module.exports = {
  devtool:"source-map",
  entry: './base.js',
  output: {
    path: __dirname+"/public",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.html$/, loader: 'html-loader'},
      {test: /\.vue$/, loader: 'vue-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader'}
    ]
  },
  resolve:{
    alias:{
      vue:"vue/dist/vue.js"
    }
  },
  devServer:{
    contentBase:"./public",
    inline:true,
    port:8888
  }
}