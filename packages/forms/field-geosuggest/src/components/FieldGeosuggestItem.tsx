import classNames from 'classnames';
import React from 'react';

const GeosuggestItem = ({ userInput: term, suggest, onClick, isActive }) => {
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
};

// GeosuggestItem.propTypes = {
//   userInput: PropTypes.string,
//   suggest: PropTypes.shape({
//     label: PropTypes.string,
//     placeId: PropTypes.string,
//     description: PropTypes.string,
//   }),
//   onClick: PropTypes.func.isRequired,
//   isActive: PropTypes.bool,
// };

// GeosuggestItem.defaultProps = {
//   userInput: undefined,
//   suggest: {},
//   isActive: false,
// };

export default GeosuggestItem;
