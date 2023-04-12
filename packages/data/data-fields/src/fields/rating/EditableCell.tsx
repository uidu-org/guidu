import { CellContext } from '@tanstack/react-table';
import React, { memo, useState } from 'react';
import { StyledRating } from './utils';

function EditableCell(props: CellContext<any, number>) {
  const { getValue, column } = props;
  const max = column.columnDef?.meta?.max || 5;

  const defaultValue = getValue() || 0;

  const [value, setValue] = useState(
    typeof defaultValue === 'string' ? Number(defaultValue) : defaultValue,
  );

  // useEffect(() => {
  //   setValue(getValue());
  // }, [getValue]);

  return (
    <div tw="flex items-center">
      <StyledRating value={defaultValue} onChange={setValue} items={max} />
      {/* {Array.from(Array(max).keys()).map((i) => (
        <button
          key={i}
          type="button"
          css={[
            value >= i + 1
              ? tw`text-yellow-300`
              : tw`text-gray-200 cursor-pointer hover:text-yellow-300`,
          ]}
          onClick={onChange}
        >
          <StarIcon tw="fill-current h-5 w-5" />
        </button>
      ))} */}
    </div>
  );
}

export default memo(EditableCell);
