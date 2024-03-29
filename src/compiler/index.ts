
import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

export const createCompiler = createCompilerCreator(function baseCompile(
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(),options);
  
  if(options.optimize !== false){
    optimize(ast,options);
  }
  console.log("ast",ast);
  const code = generate(ast,options);
  console.log("code",code)
  return {
    ast,
    render:code.render,
    staticRenderFns:code.staticRenderFns
  }
})