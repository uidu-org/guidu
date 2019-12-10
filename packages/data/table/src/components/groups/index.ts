export const toggleRow = ({ api, node }) => {
  return api.setRowNodeExpanded(node, !node.expanded);
};

export const groupRenderer = ({ api, value, node }) => {
  if (!value) {
    return null;
  }

  const eDiv = document.createElement('div');
  eDiv.innerHTML = `
    <div class="d-flex justify-content-between" style="padding-left: ${node.level *
      1}rem;">
      <span style="line-height: initial; display: flex; align-items: center; flex-grow: 1; white-space: normal; min-width: 0;">
        <span class="d-flex flex-column justify-content-center" style="line-height: initial; min-width: 0;">
          <span class="small text-muted text-truncate">${
            node.rowGroupColumn.colDef.headerName
          }</span>
          <span class="text-truncate">${value}</span>
        </span>
      </span>
      <span class="ml-2">
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
