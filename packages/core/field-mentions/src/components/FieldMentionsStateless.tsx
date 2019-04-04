import React, { Component } from 'react';
import classNames from 'classnames';
import { MentionsInput, Mention } from 'react-mentions';

import { FieldMentionsStatelessProps } from '../types';
import { defaultStyle, defaultMentionStyle } from '../utils';

export default class FieldMentionsStateless extends Component<
  FieldMentionsStatelessProps
> {
  static defaultProps = {
    markup: '[__display__](__type__:__id__)',
    placeholder: "Mention people using '@'",
    allowSpaceInQuery: true,
    displayTransform: (id, display) => display,
    style: defaultStyle,
  };

  render() {
    const {
      value,
      style,
      markup,
      displayTransform,
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
        value={value ? value.value : ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
        markup={markup}
        style={style}
        displayTransform={displayTransform}
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
