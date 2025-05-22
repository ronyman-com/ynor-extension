module.exports = function() {
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        if (path.node.tag.name === 'ynor') {
          // Transform .ynor template literals
          path.replaceWithSourceString(
            `Ynor.compile(${path.node.quasi.quasis[0].value.raw})`
          );
        }
      }
    }
  };
};