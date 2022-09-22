import React from 'react';
import { useDataManagerContext } from './DataManagerContext';

export default function DataManagerFooter() {
  const { currentView } = useDataManagerContext();

  switch (currentView.kind) {
    case 'calendar':
      return <></>;
    case 'board':
      return <></>;
    case 'gallery':
      return (
        <>
          {/* <DataManagerPagination
            previousPage={previousPage}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            gotoPage={gotoPage}
          /> */}
        </>
      );
    case 'list':
      return (
        <>
          {/* <DataManagerPagination
            previousPage={previousPage}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            gotoPage={gotoPage}
          /> */}
        </>
      );
    default:
      return (
        <>
          {/* <DataManagerPagination
            previousPage={previousPage}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            gotoPage={gotoPage}
          /> */}
        </>
      );
  }
}
