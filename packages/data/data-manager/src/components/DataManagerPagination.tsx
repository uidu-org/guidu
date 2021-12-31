import Pagination from '@uidu/pagination';
import React from 'react';

function DataManagerPagination({ pageIndex, pageOptions, gotoPage }) {
  const pages = [...Array(pageOptions.length)].map((_, i) => ({
    label: i + 1,
    href: `page-${i + 1}`,
    index: i,
  }));
  return (
    <div tw="border-t px-4 py-4 flex justify-end">
      <div>
        <Pagination
          selectedIndex={pageIndex}
          pages={pages}
          getPageLabel={({ label }) => label}
          onChange={(e, newPage) => {
            gotoPage(newPage.index);
          }}
        />
      </div>
    </div>
  );
}

export default DataManagerPagination;
