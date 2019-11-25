export default params => {
  if (params.node && params.node.group) {
    return null;
  }

  if (!params || !params.value) {
    return '-';
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
        <span class="mr-1">${params.value.before}</span>
        ${params.value.name}
      </div>
    </span>
  `;
};
