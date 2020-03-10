import classNames from 'classnames';
import React from 'react';

export default function GeosuggestItem({
  userInput: term,
  suggest,
  onClick,
  isActive,
}) {
  const text = suggest.label;
  const cleanedTerm = term.replace(/(\s+)/, '(<[^>]+>)*$1(<[^>]+>)*');
  const pattern = new RegExp(cleanedTerm, 'gi');
  const cleanedText = text.replace(pattern, '<b>$&</b>');
  return (
    <a
      role="button"
      tabIndex={0}
      className={classNames('dropdown-item', {
        active: isActive,
      })}
      onClick={e => {
        e.preventDefault();
        onClick(suggest);
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: cleanedText }} />
    </a>
  );
}
