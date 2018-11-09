import React, { Component } from 'react';
import { MentionsInput, Mention } from 'react-mentions';

import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Icon from './icon';
import Row from './row';

export default class InputWithMentions extends Component {
  handleChange = (event, newValue, newPlainTextValue, mentions) => {
    const { onSetValue, onChange, name } = this.props;
    if (newValue === '') {
      onSetValue('');
      onChange(name, '');
    } else {
      onSetValue({
        value: newValue,
        plainTextValue: newPlainTextValue,
        mentions,
      });
      onChange(name, {
        value: newValue,
        plainTextValue: newPlainTextValue,
        mentions,
      });
    }
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    const {
      value,
      style,
      markup,
      displayTransform,
      placeholder,
      allowSpaceInQuery,
      items,
      errorMessages,
      help,
      id,
      layout,
      showErrors,
    } = this.props;

    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    delete inputProps.value;
    delete inputProps.isPristine;
    delete inputProps.floatLabel;
    delete inputProps.showErrors;
    delete inputProps.items;

    const control = (
      <MentionsInput
        {...inputProps}
        value={value ? value.value : ''}
        onChange={this.handleChange}
        markup={markup}
        style={style}
        displayTransform={displayTransform}
        placeholder={placeholder}
        allowSpaceInQuery={allowSpaceInQuery}
      >
        {items.map(item => (
          <Mention {...item} key={item.type} appendSpaceOnAdd />
        ))}
      </MentionsInput>
    );

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {control}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        {help ? <Help help={help} /> : null}
        {showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
      </Row>
    );
  }
}

InputWithMentions.propTypes = {
  ...ComponentCommon.propTypes,
};

InputWithMentions.defaultProps = {
  ...ComponentCommon.defaultProps,
  markup: '[__display__](__type__:__id__)',
  placeholder: "Mention people using '@'",
  allowSpaceInQuery: true,
  displayTransform: (id, display) => display,
};
