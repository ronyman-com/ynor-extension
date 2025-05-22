const path = require('path');
const YnorCompiler = require('ynor-compiler');

module.exports = {
  mode: 'development',
  entry: './src/main.ynor',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ynor-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ynor$/,
        use: [
          {
            loader: 'ynor-loader',
            options: {
              hotReload: true,
              compiler: new YnorCompiler({
                delimiters: ['{{', '}}'],
                directives: {
                  'if': 'processIf',
                  'for': 'processFor'
                }
              })
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: './public',
    hot: true,
    before: (app) => {
      app.get('/api/*', (req, res) => {
        // Mock API handler
        res.json({ status: 'ok' });
      });
    }
  },
  plugins: [
    new (require('html-webpack-plugin'))({
      template: './public/index.html'
    })
  ]
};