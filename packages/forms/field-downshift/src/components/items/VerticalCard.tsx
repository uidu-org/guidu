import classNames from 'classnames';
import React from 'react';
import { Check } from 'react-feather';

export default function HorizontalCard({
  item,
  highlightedIndex,
  index,
  selectedItem,
  onClick,
  scope,
  ...rest
}) {
  const isSelected = selectedItem && selectedItem.id === item.id;
  const isHighlighted = highlightedIndex === index;

  return (
    <a
      key={index}
      href="#"
      className={classNames('card mb-3', {
        [`border-${scope}`]: isHighlighted || isSelected,
      })}
      onClick={e => {
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
      <div className="card-body p-3 p-md-4 d-flex align-items-center">
        <div className="d-flex align-items-center text-md-center flex-md-column flex-grow-1">
          {item.before && (
            <div className="mr-3 mb-0 mb-md-3 mr-md-0">{item.before}</div>
          )}
          <div>
            <h6 className="m-0">{item.name}</h6>
            <p className="mb-0 text-muted">{item.description}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
