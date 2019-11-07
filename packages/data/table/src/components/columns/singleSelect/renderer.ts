export default params => {
  if (!params) {
    return '-';
  }
  return `
    <div style="min-width: 0; display: flex;">
      <span
        style="
          min-width: 18px;
          font-size: .9rem;
          font-weight: 500;
          border-radius: 9999px;
          padding-left: .5rem;
          padding-right: .5rem;
          padding-top: .15rem;
          padding-bottom: .15rem;
          background-color: ${params.value.color || '#f1f3f5'};
          display: inline-block;
          line-height: unset;
        "
      >
        <div class="text-truncate">${params.value.name}</div>
      </span>
    </div>
  `;
};
