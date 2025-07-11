const YnorCompiler = require('../ynor-compiler');
const compiler = new YnorCompiler();

module.exports = function(source) {
  const callback = this.async();
  
  try {
    // Add proper error handling and source map support
    const { code, map } = compiler.compile(source);
    
    callback(null, code, map);
  } catch (error) {
    callback(error);
  }
};