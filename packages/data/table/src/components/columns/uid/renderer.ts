export const toggleRow = ({ api, node }) => {
  console.log('pippo');
  return api.setRowNodeExpanded(node, !node.expanded);
};

export default params => {
  const { api, value, node } = params;
  console.log(params);
  if (!value) {
    return null;
  }

  const eDiv = document.createElement('div');
  eDiv.innerHTML = `
  <div class="d-flex justify-content-between">
    <span style="line-height: initial; display: flex; align-items: center; flex-grow: 1; white-space: normal; min-width: 0;">
      <span class="d-flex flex-column justify-content-center" style="line-height: initial; min-width: 0;">
        <span class="text-muted">${params.rowIndex}.</span>
      </span>
    </span>
    <span class="ml-2 ag-cell-uid-external-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize-2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
    </span>
  </div>
  `;

  const eButton = eDiv.querySelector('.ag-cell-uid-external-link');

  const onItemClick = e => {
    e.stopPropagation();
    params.onItemClick(params, e);
  };

  eButton.addEventListener('click', onItemClick);
  eDiv.addEventListener('click', onItemClick);
  return eDiv;
};
