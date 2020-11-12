import classNames from 'classnames';
import React from 'react';
import { Check } from 'react-feather';

export default function HorizontalCard({
  item,
  index,
  scope,
  isSelected,
  getItemProps,
}) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <a
      key={index}
      href="#"
      className={classNames('card mb-3', {
        [`border-${scope}`]: isSelected,
      })}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      {...rest}
    >
      <div className="card-header position-absolute w-100 bg-transparent border-0 text-right p-2">
        <span
          className={classNames('', {
            border: !isSelected,
            [`bg-${scope} text-white`]: isSelected,
          })}
          style={{
            height: 20,
            width: 20,
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto',
          }}
        >
          {isSelected && <Check size={16} />}
        </span>
      </div>
      <div className="card-body p-3 p-md-4">
        <div className="d-flex align-items-center">
          {item.before && <div className="mr-3 d-flex">{item.before}</div>}
          <div>
            <h6 className="m-0">{item.name}</h6>
            {item.description && (
              <p className="mb-0 mt-2 text-muted">{item.description}</p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
