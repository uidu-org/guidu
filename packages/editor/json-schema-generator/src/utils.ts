import * as ts from 'typescript';
export type TagInfo = {
  name: string;
  allowUnsupportedBlock?: boolean;
  allowUnsupportedInline?: boolean;
};

export function getTags(tagInfo: ts.JSDocTagInfo[]): TagInfo {
  return tagInfo.reduce(
    (obj, { name, text = '' }) => {
      // TODO: Fix any
      let val: any = text;
      if (/^\d+$/.test(text)) {
        // Number
        val = +text;
      } else if (text[0] === '"') {
        // " wrapped string
        val = JSON.parse(text);
      } else if (text === 'true') {
        val = true;
      } else if (text === 'false') {
        val = false;
      }
      // TODO: Fix any
      (obj as any)[name] = val;
      return obj;
    },
    {} as TagInfo,
  );
}

export type PrimitiveType = number | boolean | string;
export type LiteralType = {
  [k in keyof ts.LiteralType]: ts.LiteralType[k] extends
    | string
    | number
    | ts.PseudoBigInt
    ? PrimitiveType
    : ts.LiteralType[k]
};
export function extractLiteralValue(typ: ts.Type): PrimitiveType {
  /* eslint-disable no-bitwise */
  if (typ.flags & ts.TypeFlags.EnumLiteral) {
    let str = String((typ as LiteralType).value);
    let num = parseFloat(str);
    return isNaN(num) ? str : num;
  } else if (typ.flags & ts.TypeFlags.StringLiteral) {
    return (typ as LiteralType).value;
  } else if (typ.flags & ts.TypeFlags.NumberLiteral) {
    return (typ as LiteralType).value;
  } else if (typ.flags & ts.TypeFlags.BooleanLiteral) {
    // TODO: Fix any
    return (typ as any).intrinsicName === 'true';
  }
  /* eslint-enable no-bitwise */
  throw new Error(`Couldn't parse in extractLiteralValue`);
}

export function getTypeFromSymbol(checker: ts.TypeChecker, symbol: ts.Symbol) {
  return checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
}

export function isSourceFile(node: ts.Node): node is ts.SourceFile {
  return node.kind === ts.SyntaxKind.SourceFile;
}

export function isInterfaceDeclaration(
  node: ts.Node,
): node is ts.InterfaceDeclaration {
  return node.kind === ts.SyntaxKind.InterfaceDeclaration;
}

export function isTypeAliasDeclaration(
  node: ts.Node | ts.Declaration,
): node is ts.TypeAliasDeclaration {
  return node.kind === ts.SyntaxKind.TypeAliasDeclaration;
}

/* eslint-disable no-bitwise */
export function isStringType(type: ts.Type) {
  return (type.flags & ts.TypeFlags.String) > 0;
}

export function isBooleanType(type: ts.Type) {
  return (type.flags & ts.TypeFlags.Boolean) > 0;
}

export function isNumberType(type: ts.Type) {
  return (type.flags & ts.TypeFlags.Number) > 0;
}

export function isUnionType(type: ts.Type): type is ts.UnionType {
  return (type.flags & ts.TypeFlags.Union) > 0;
}

export function isIntersectionType(type: ts.Type): type is ts.IntersectionType {
  return (type.flags & ts.TypeFlags.Intersection) > 0;
}

export function isArrayType(type: ts.Type): type is ts.TypeReference {
  /**
   * Here instead of checking `type.getSymbol().getName() === 'Array'`
   * we are checking `length`.
   * @see https://blogs.msdn.microsoft.com/typescript/2018/01/17/announcing-typescript-2-7-rc/#fixed-length-tuples
   */
  return (
    isObjectType(type) &&
    (type.objectFlags & ts.ObjectFlags.Reference) > 0 &&
    !!type.getProperty('length')
  );
}

export function isObjectType(type: ts.Type): type is ts.ObjectType {
  return (type.flags & ts.TypeFlags.Object) > 0;
}

export function isStringLiteralType(type: ts.Type): type is ts.LiteralType {
  return (type.flags & ts.TypeFlags.StringLiteral) > 0;
}

export function isLiteralType(type: ts.Type): type is ts.LiteralType {
  return (type.flags & ts.TypeFlags.Literal) > 0;
}

export function isNonPrimitiveType(type: ts.Type): type is ts.LiteralType {
  return (type.flags & ts.TypeFlags.NonPrimitive) > 0;
}

export function isAnyType(type: ts.Type): type is ts.Type {
  return (type.flags & ts.TypeFlags.Any) > 0;
}
/* eslint-enable no-bitwise */

export function syntaxKindToName(kind: ts.SyntaxKind) {
  return ts.SyntaxKind[kind];
}

export function getPmName(name: string) {
  return (
    name
      .replace(/_node|_mark$/, '')
      // @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/722076396/ADF+Change+22+Consistent+naming
      .replace('table_row', 'tableRow')
      .replace('table_header', 'tableHeader')
      .replace('table_cell', 'tableCell')
  );
}

export function isObject(value: any) {
  return value !== null && typeof value === 'object';
}
