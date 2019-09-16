function MyCellRenderer() {}

// gets called once before the renderer is used
MyCellRenderer.prototype.init = function(params) {
  // create the cell
  this.eGui = document.createElement('div');
  this.eGui.innerHTML = `<span class="d-flex align-items-center"><img class="rounded-circle mr-2" style="width: 24px" src=${params.data.avatar} /><span class="text-truncate">${params.value}</span></span>`;
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
