const visit = require('unist-util-visit');
const babel = require('@babel/core');

const ts = ['ts', 'tsx', 'typescript'];
const babelOptions = {
  presets: [
    [
      '@babel/typescript',
      {
        allExtensions: true,
        isTSX: true
      }
    ]
  ]
};

module.exports = ({markdownAST}) => {
  visit(markdownAST, 'code', node => {
    if (ts.includes(node.lang)) {
      try {
        const { code } = babel.transformSync(node.value, babelOptions);
        console.log(code);
      } catch (error) {
        console.log(error.message);
      }
    }
  });

  return markdownAST;
};
