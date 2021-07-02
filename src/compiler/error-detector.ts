// detect problematic expressions in a template
export function detectErrors(ast?: ASTNode, warn?: Function) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode(node: ASTNode, warn: Function) {
}