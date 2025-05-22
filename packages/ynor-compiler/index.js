const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;

class YnorCompiler {
  compile(source) {
    const ast = parse(source, {
      sourceType: 'module',
      plugins: ['jsx']
    });

    // Transform AST here
    const output = generate(ast, {
      retainLines: true,
      compact: false
    });

    return {
      code: output.code,
      map: output.map
    };
  }
}

module.exports = YnorCompiler;