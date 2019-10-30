function MyCellRenderer() {}

// gets called once before the renderer is used
MyCellRenderer.prototype.init = function(params) {
  console.log(params);
  // create the cell
  this.eGui = document.createElement('div');
  this.eGui.style = 'min-width: 0;';
  this.eGui.innerHTML = `<div class="progress" style="height: 5px;"><div class="progress-bar" role="progressbar" style="width: ${params.value *
    100}%;" aria-valuenow="${params.value *
    100}" aria-valuemin="0" aria-valuemax="100"></div></div>`;
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
