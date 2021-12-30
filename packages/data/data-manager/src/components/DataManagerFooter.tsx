import React from 'react';
import { useDataManagerContext } from './DataManagerContext';
import DataManagerPagination from './DataManagerPagination';

export default function DataManagerFooter() {
  const {
    currentView,
    tableInstance,
    tableInstance: {
      state: { pageIndex },
      previousPage,
      nextPage,
      canPreviousPage,
      canNextPage,
      pageOptions,
      gotoPage,
    },
  } = useDataManagerContext();
  switch (currentView.kind) {
    case 'calendar':
      return <></>;
    case 'board':
      return <></>;
    case 'gallery':
      return (
        <>
          <DataManagerPagination
            previousPage={previousPage}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            gotoPage={gotoPage}
          />
        </>
      );
    case 'list':
      return (
        <>
          <DataManagerPagination
            previousPage={previousPage}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            gotoPage={gotoPage}
          />
        </>
      );
    default:
      return (
        <>
          <DataManagerPagination
            previousPage={previousPage}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            gotoPage={gotoPage}
          />
        </>
      );
  }
}
