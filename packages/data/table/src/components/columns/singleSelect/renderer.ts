function SingleSelectCellRenderer() {}

// gets called once before the renderer is used
SingleSelectCellRenderer.prototype.init = function(params) {
  // create the cell
  this.eGui = document.createElement('div');
  this.eGui.style = 'min-width: 0;';
  if (params.value) {
    this.eGui.innerHTML = `
      <span
        style="
          min-width: 18px;
          font-size: .9rem;
          font-weight: 500;
          border-radius: 9999px;
          padding-left: .5rem;
          padding-right: .5rem;
          background-color: ${params.value.color || '#f1f3f5'};
          display: inline-block;
          line-height: unset;
        ">
        <div class="text-truncate">${params.value.name}</div>
      </span>
    `;
  }
};

// gets called once when grid ready to insert the element
SingleSelectCellRenderer.prototype.getGui = function() {
  return this.eGui;
};

// gets called whenever the user gets the cell to refresh
SingleSelectCellRenderer.prototype.refresh = function() {
  // return true to tell the grid we refreshed successfully
  return true;
};

export default SingleSelectCellRenderer;
