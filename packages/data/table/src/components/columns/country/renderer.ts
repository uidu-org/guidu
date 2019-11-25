export default params => {
  // if (params.node && params.node.group) {
  //   return null;
  // }

  if (!params || !params.value) {
    return null;
  }

  const value = params.countries.filter(
    option => option.abbr === params.value,
  )[0];

  if (!value) {
    return params.value;
  }

  return `
    <span
      style="
        min-width: 18px;
        font-size: .9rem;
        font-weight: 500;
        display: inline-grid;
        line-height: normal;
        align-items: center;
      "
    >
      <div class="text-truncate">
        <span class="mr-1">${value.before}</span>
        ${value.name}
      </div>
    </span>
  `;
};
