import { Node as PmNode } from 'prosemirror-model';

export function calcTableColumnWidths(node: PmNode): number[] {
  let tableColumnWidths: Array<number> = [];
  const firstRow = node.firstChild;

  if (firstRow) {
    // Sanity validation, but it should always have a first row
    // Iterate for the cells in the first row
    firstRow.forEach(colNode => {
      let colwidth = colNode.attrs.colwidth || [0];

      // If we have colwidth, we added it
      if (colwidth) {
        tableColumnWidths = [...tableColumnWidths, ...colwidth];
      }
    });
  }

  return tableColumnWidths;
}
