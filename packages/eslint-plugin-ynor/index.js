module.exports = {
  rules: {
    'no-deprecated-apis': {
      meta: {
        docs: {
          description: 'Disallow use of deprecated Ynor APIs',
          category: 'Best Practices'
        }
      },
      create(context) {
        return {
          MemberExpression(node) {
            if (node.object.name === 'Ynor' && node.property.name === 'deprecatedMethod') {
              context.report({
                node,
                message: 'Ynor.deprecatedMethod() is deprecated'
              });
            }
          }
        };
      }
    }
  }
};