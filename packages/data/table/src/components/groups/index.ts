export const toggleRow = ({ api, node }) => {
  return api.setRowNodeExpanded(node, !node.expanded);
};

export const groupRenderer = ({ api, value, node }) => {
  if (!value) {
    return null;
  }

  console.log(node);

  const eDiv = document.createElement('div');
  eDiv.innerHTML = `
    <div class="d-flex justify-content-between">
      <span style="line-height: initial;display: flex; align-items: center; flex-grow: 1;">
        <span class="d-flex flex-column justify-content-center" style="line-height: initial">
          <span class="small text-muted">${node.rowGroupColumn.colDef.headerName}</span>
          <span>${value}</span>
        </span>
      </span>
      <span>
        <span class="badge badge-pill py-1 ag-group-child-count">
          ${node.allChildrenCount}
        </span>
      </span>
    </div>
  `;

  const eventListener = () => toggleRow({ api, node });
  eDiv.addEventListener('click', eventListener);
  return eDiv;
};
