import * as t from '@babel/types'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import template from '@babel/template'
import generate from '@babel/generator'

// eslint-disable-next-line import/no-default-export
export default function transform(source: any): any {
  const ast = parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] })
  const locationsMap: { [key: string]: any } = {}

  traverse(ast, {
    ExportNamedDeclaration(path) {
      const names = path.node.declaration.declarations.map(
        (declaration: any) => declaration.id.name,
      )
      if (names.length === 1) {
        locationsMap[names[0]] = path.node.loc
      }
    },
  })

  const templateSourceMeta = template.statement(`
    var __source__ = { storySource: { source: SOURCE, locationsMap: LOCATIONS_MAP } };
  `)
  const sourceMetaAst = templateSourceMeta({
    SOURCE: t.stringLiteral(source),
    LOCATIONS_MAP: t.callExpression(
      t.memberExpression(t.identifier('JSON'), t.identifier('parse')),
      [t.stringLiteral(JSON.stringify(locationsMap))],
    ),
  })

  traverse(ast, {
    Program(path) {
      path.node.body.unshift(sourceMetaAst)
    },
    ExportDefaultDeclaration(path) {
      if (path.node.declaration.type === 'ObjectExpression') {
        const maybeParamNode = path.node.declaration.properties.find((property) => {
          return (
            property.type === 'ObjectProperty' &&
            property.key.name === 'parameters' &&
            t.isIdentifier(property.key)
          )
        })

        if (t.isObjectProperty(maybeParamNode)) {
          if (t.isIdentifier(maybeParamNode.value) || t.isObjectExpression(maybeParamNode.value)) {
            const extendableArgument = maybeParamNode.shorthand
              ? t.identifier('parameters')
              : maybeParamNode.value
            maybeParamNode.value = t.callExpression(
              t.memberExpression(t.identifier('Object'), t.identifier('assign')),
              [extendableArgument, t.identifier('__source__')],
            )
          }
        } else {
          path.node.declaration.properties.push(
            // prettier-ignore
            t.objectProperty(
              t.identifier('parameters'),
              t.identifier('__source__'),
            ),
          )
        }
      }
    },
  })

  const result = generate(ast, { retainLines: true }, source)
  return result.code
}
