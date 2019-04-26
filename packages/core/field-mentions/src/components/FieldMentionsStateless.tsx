import React, { Component } from 'react';
import classNames from 'classnames';
import { MentionsInput, Mention } from 'react-mentions';

import { FieldMentionsStatelessProps } from '../types';
import { defaultStyle, defaultMentionStyle } from '../utils';

export default class FieldMentionsStateless extends Component<
  FieldMentionsStatelessProps
> {
  static defaultProps = {
    placeholder: "Mention people using '@'",
    allowSpaceInQuery: true,
    style: defaultStyle,
  };

  render() {
    const {
      value,
      placeholder,
      allowSpaceInQuery,
      items,
      onChange,
      onKeyDown,
      className,
      suggestionsPortalHost,
      style,
    } = this.props;

    return (
      <MentionsInput
        value={value.value || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
        placeholder={placeholder}
        allowSpaceInQuery={allowSpaceInQuery}
        className={classNames('form-control h-auto', className)}
        suggestionsPortalHost={suggestionsPortalHost}
      >
        {items.map(item => (
          <Mention
            {...item}
            key={item.type}
            style={defaultMentionStyle}
            appendSpaceOnAdd
          />
        ))}
      </MentionsInput>
    );
  }
}
