import { groupRenderer } from '../../groups';

export default params => {
  // create the cell
  if (params.node && params.node.group) {
    return groupRenderer(params);
  }

  if (params.value) {
    // show option cell
    return `
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
          display: inline-flex;
          line-height: normal;
        "
      >
        <div class="text-truncate">${params.value.name}</div>
      </span>
    `;
  }

  return `
    <span class="mr-2">**** 5518</span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
  `;
};
