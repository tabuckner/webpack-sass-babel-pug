const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});
let cleanDist = new CleanWebpackPlugin(['dist/**/*'])

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js' // TODO: See if theres a better way of saying output dir for js
  },
  module: {
    rules: [{
        test: /\.(s*)css$/,
        use: extractPlugin.extract({
          use: [{
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        // test: /\.(svg|gif|png|eot|woff|ttf)$/, // Load all fonts/imgs as data url
        test: /\.(eot|woff|ttf)$/, // Load all fonts as data url
        use: [
          'url-loader'
        ]
      },
      {
        test: /\.js$/, // Transpile ES6 Code w/ Babel
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i, // Minify images w/ a simple load fallback
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Can be swapped to a hash in the future
              outputPath: 'img/',
              publicPath: 'img/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.html$/, // Use html-loader for those files
        use: [
          'html-loader'
        ]
      }
    ]
  },
  plugins: [
    /**
     * ==========
     *  PAGES :/
     * ==========
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'head',
      // Chunks will likely need to be used in the future
    }),
    new HtmlWebpackPlugin({
      template: 'src/photos.html',
      filename: 'photos.html',
      inject: 'head',
      // Chunks will likely need to be used in the future
    }),
    /**
     * ==========
     * Plugins
     * ==========
     */
    // new CopyWebpackPlugin([{ //These two must be in this order
    //   from: path.resolve(__dirname, 'src/img/'),
    //   to: path.resolve(__dirname, 'dist/img/')
    // }]),
    // new ImageminPlugin({
    //   test: /\.(jpe?g|png|gif|svg)$/i
    // }),
    extractPlugin,
    cleanDist
  ]
}