import classNames from 'classnames';
import React, { Component } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { FieldMentionsStatelessProps } from '../types';
import { defaultMentionStyle, defaultStyle } from '../utils';

export default class FieldMentionsStateless extends Component<
  FieldMentionsStatelessProps
> {
  private inputRef: React.RefObject<any> = React.createRef();

  static defaultProps = {
    placeholder: "Mention people using '@'",
    allowSpaceInQuery: true,
    style: defaultStyle,
    value: {},
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
        inputRef={this.inputRef}
      >
        {items.map((item, index) => (
          <Mention
            {...item}
            key={`mention-${index}`}
            style={defaultMentionStyle}
            appendSpaceOnAdd
          />
        ))}
      </MentionsInput>
    );
  }
}
