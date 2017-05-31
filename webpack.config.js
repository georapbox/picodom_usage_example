const path = require('path');
// const devEnv = process.env.NODE_ENV === 'development';
// const prdEnv = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
}
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
