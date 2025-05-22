const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

class YnorServer {
  constructor(config) {
    this.app = express();
    this.config = config;
    this.compiler = webpack(config);
  }

  start() {
    this.app.use(middleware(this.compiler, {
      publicPath: this.config.output.publicPath
    }));

    return this.app.listen(this.config.devServer.port, () => {
      console.log(`Server running on port ${this.config.devServer.port}`);
    });
  }
}

module.exports = YnorServer;