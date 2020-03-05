import classNames from 'classnames';
import React from 'react';
import { CheckSquare, Square } from 'react-feather';

export default function Checkbox({ item, index, isSelected, getItemProps }) {
  return (
    <button
      type="button"
      key={item.id}
      className={classNames(
        'd-flex card px-4 py-3 mb-2 align-items-center justify-content-start text-left flex-row w-100',
        {
          'bg-primary text-white': !!isSelected,
        },
      )}
      {...getItemProps({ item, index })}
    >
      {isSelected ? (
        <div className="text-white mr-3 d-flex align-items-center">
          <CheckSquare size={16} />
        </div>
      ) : (
        <div className="mr-3 d-flex align-items-center">
          <Square size={16} />
        </div>
      )}
      <div>
        <p className="mb-0">{item.name}</p>
        {item.description && (
          <p className="mb-0 text-muted">{item.description}</p>
        )}
      </div>
    </button>
  );
}
