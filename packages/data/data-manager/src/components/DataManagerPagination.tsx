import Button, { ButtonGroup } from '@uidu/button';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

function DataManagerPagination({
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
  gotoPage,
}) {
  return (
    <div tw="border-t px-4 py-4">
      <div>
        <ButtonGroup>
          <Button
            onClick={() => previousPage()}
            isDisabled={!canPreviousPage}
            iconBefore={<ChevronLeft size={14} />}
          />
          <Button
            onClick={() => nextPage()}
            isDisabled={!canNextPage}
            iconBefore={<ChevronRight size={14} />}
          />
          <Button>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </Button>
        </ButtonGroup>
        {/* <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span> */}
      </div>
    </div>
  );
}

export default DataManagerPagination;
