export const toggleRow = ({ api, node }) => {
  return api.setRowNodeExpanded(node, !node.expanded);
};

export const groupRowInnerRenderer = ({ api, value, node }) => {
  if (!value) {
    return null;
  }

  const eDiv = document.createElement('div');
  eDiv.innerHTML = `
    <div class="d-flex justify-content-between">
      <span class="d-flex flex-column justify-content-center" style="line-height: initial">
        <span class="small text-muted">${node.rowGroupColumn.colDef.headerName}</span>
        <span>${value}</span>
      </span>
      <span>${node.allChildrenCount}</span>
    </div>
  `;

  const eventListener = () => toggleRow({ api, node });
  eDiv.addEventListener('click', eventListener);
  return eDiv;
};
