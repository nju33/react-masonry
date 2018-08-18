import path from 'path';
import Webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Webpack.Configuration = {
  mode: 'development',
  entry: path.join(__dirname, 'demo/index.tsx'),
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.tsx', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          happyPackMode: true,
          configFile: 'tsconfig.webpack.json'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ]
}

export default config;