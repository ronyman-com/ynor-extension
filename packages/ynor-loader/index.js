const { compile } = require('ynor-compiler');

module.exports = function(source) {
  const callback = this.async();
  const { code } = compile(source);
  callback(null, code);
};