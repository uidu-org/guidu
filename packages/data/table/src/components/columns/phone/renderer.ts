function MyCellRenderer() {}

// gets called once before the renderer is used
MyCellRenderer.prototype.init = function(params) {
  console.log(params);
  // create the cell
  this.eGui = document.createElement('div');
  this.eGui.style = 'min-width: 0;';
  this.eGui.innerHTML = `<span class="d-flex align-items-center justify-content-between"><span class="flex-grow-1">${params.value ||
    '-'}</span>${
    params.value
      ? `<a href="tel:${params.value}" class="btn p-1" type="button">`
      : ''
  }</span>`;
};

// gets called once when grid ready to insert the element
MyCellRenderer.prototype.getGui = function() {
  return this.eGui;
};

// gets called whenever the user gets the cell to refresh
MyCellRenderer.prototype.refresh = function() {
  // return true to tell the grid we refreshed successfully
  return true;
};

export default MyCellRenderer;
