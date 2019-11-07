export default ({ value, avatar, data }) => {
  // create the cell
  return `
    <div style="min-width: 0">
      <span class="d-flex align-items-center">
        <img class="rounded-circle mr-2" style="width: 24px" src=${avatar(
          data,
        )} />
        <span class="text-truncate">${value}</span>
      </span>
    </div>
  `;
};
