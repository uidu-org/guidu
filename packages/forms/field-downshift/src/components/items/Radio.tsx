import classNames from 'classnames';
import React from 'react';
import { CheckCircle, Circle } from 'react-feather';

export default function Checkbox({ item, index, isSelected, getItemProps }) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <button
      type="button"
      key={item.id}
      className={classNames(
        'd-flex card px-4 py-3 mb-2 align-items-center justify-content-start text-left flex-row w-100',
        {
          'bg-primary text-white': isSelected,
        },
      )}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      {...rest}
    >
      {isSelected ? (
        <div className="text-white mr-3 d-flex align-items-center">
          <CheckCircle size={16} />
        </div>
      ) : (
        <div className="mr-3 d-flex align-items-center">
          <Circle size={16} />
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
