import classNames from 'classnames';
import React from 'react';
import { FieldGeosuggestItemProps } from '../types';

export default function FieldGeosuggestItem({
  suggestion,
  onClick,
  isActive: active,
}: FieldGeosuggestItemProps) {
  const {
    description,
    structured_formatting: {
      main_text,
      main_text_matched_substrings,
      secondary_text,
    },
  } = suggestion;
  return (
    <a
      role="button"
      tabIndex={0}
      className={classNames('dropdown-item', {
        active,
      })}
      onClick={e => {
        e.preventDefault();
        onClick(suggestion);
      }}
    >
      <strong>{main_text}</strong> <small>{secondary_text}</small>
    </a>
  );
}
