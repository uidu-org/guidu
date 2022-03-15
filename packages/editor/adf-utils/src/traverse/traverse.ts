import { ADFEntity, EntityParent, VisitorCollection } from '../types';

export function validateVisitors(_visitors: VisitorCollection) {
  return true;
}

function traverseNode(
  adfNode: ADFEntity,
  parent: EntityParent,
  visitors: VisitorCollection,
  index: number,
  depth: number,
): ADFEntity | false {
  const visitor = visitors[adfNode.type] || visitors['any'];

  let newNode = { ...adfNode };
  if (visitor) {
    const processedNode = visitor({ ...newNode }, parent, index, depth);

    if (processedNode === false) {
      return false;
    }

    newNode = processedNode || adfNode;
  }

  if (newNode.content) {
    newNode.content = newNode.content.reduce<Array<ADFEntity>>(
      (acc, node, idx) => {
        const processedNode = traverseNode(
          node,
          { node: newNode, parent },
          visitors,
          idx,
          depth + 1,
        );
        if (processedNode !== false) {
          acc.push(processedNode);
        }
        return acc;
      },
      [],
    );
  }

  return newNode;
}

export function traverse(adf: ADFEntity, visitors: VisitorCollection) {
  if (!validateVisitors(visitors)) {
    throw new Error(
      `Visitors are not valid: "${Object.keys(visitors).join(', ')}"`,
    );
  }

  return traverseNode(adf, { node: undefined }, visitors, 0, 0);
}
