import * as React from 'react';
import { Directory, NavGroupItem, File } from '../../../types';
import * as fs from '../../../utils/fs';

export type groupType = {
  title?: string;
  items: Array<NavGroupItem>;
};
export default function buildNavGroups(
  prefix: string,
  // TODO: [strictFunctionTypes] Fix any
  Icon: React.ComponentType<any>,
  pathname: string,
  dir: Directory,
) {
  return dir.children.map(
    (group: File | Directory): groupType => {
      if (group.type === 'file') {
        return {
          items: [
            {
              to: `/${prefix}/${fs.normalize(group.id)}`,
              isSelected: (pathname, to) => pathname.startsWith(to),
              title: fs.titleize(group.id),
              // icon: <Icon label={`${fs.titleize(group.id)} icon`} />,
            },
          ],
        };
      }

      const children = fs.getFiles(group.children);
      return {
        title: group.id,
        items: children.map(doc => {
          return {
            to: `/${prefix}/${group.id}/${fs.normalize(doc.id)}`,
            isSelected: (pathname, to) => pathname.startsWith(to),
            title: fs.titleize(doc.id),
            // icon: <Icon label={`${fs.titleize(doc.id)} icon`} />,
          };
        }),
      };
    },
  );
}
