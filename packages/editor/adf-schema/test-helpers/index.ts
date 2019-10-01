import { Mark, Node as PMNode } from 'prosemirror-model';
import * as fs from 'fs';

export const readFilesSync = (path: string) => {
  return fs.readdirSync(path).reduce(
    (acc, name) => {
      if (name.match(/\.json$/)) {
        acc.push({
          name,
          data: JSON.parse(fs.readFileSync(`${path}/${name}`, 'utf-8')),
        });
      }

      return acc;
    },
    [] as { name: string; data: any }[],
  );
};

export * from './html-helpers';

export const textWithMarks = (obj: PMNode, text: string, marks: Mark[]) => {
  let matched = false;
  obj.descendants(node => {
    if (node.isText && node.text === text) {
      if (Mark.sameSet(node.marks, marks)) {
        matched = true;
      }
    }
  });

  return matched;
};

export { default as schema } from './schema';
export * from './schema-builder';
