// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@uidu/analytics';
import { Row, Label } from '@uidu/field-base';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import Input from './styled/Input';
import type { FieldTextProps } from './types';

const Wrapper = styled.div`
  flex: 1 1 100%;
`;

type Props = FieldTextProps & {
  innerRef?: (node: ?HTMLInputElement) => void,
};

class FieldTextStateless extends Component<Props, void> {
  static defaultProps = {
    compact: false,
    disabled: false,
    isInvalid: false,
    isReadOnly: false,
    isSpellCheckEnabled: true,
    onChange: () => {},
    required: false,
    type: 'text',
    isValidationHidden: false,
    innerRef: () => {},
  };

  input: ?HTMLInputElement;

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  setInputRef = (input: ?HTMLInputElement) => {
    this.input = input;
    // $FlowFixMe - Cannot call `this.props.innerRef` because undefined [1] is not a function
    this.props.innerRef(input);
  };

  render() {
    return (
      <Wrapper>
        {!this.props.isLabelHidden && (
          <Label
            htmlFor={this.props.id}
            isDisabled={this.props.disabled}
            isLabelHidden={this.props.isLabelHidden}
            isRequired={this.props.required}
            label={this.props.label || ''}
          />
        )}
        <Row
          invalidMessage={this.props.invalidMessage}
          isCompact={this.props.compact}
          isDisabled={this.props.disabled}
          isFitContainerWidthEnabled={this.props.shouldFitContainer}
          isInvalid={this.props.isInvalid}
          isReadOnly={this.props.isReadOnly}
          isRequired={this.props.required}
          isValidationHidden={this.props.isValidationHidden}
        >
          <Input
            autoComplete={this.props.autoComplete}
            autoFocus={this.props.autoFocus}
            disabled={this.props.disabled}
            form={this.props.form}
            id={this.props.id}
            innerRef={this.setInputRef}
            isMonospaced={this.props.isMonospaced}
            maxLength={this.props.maxLength}
            min={this.props.min}
            max={this.props.max}
            name={this.props.name}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onKeyDown={this.props.onKeyDown}
            onKeyPress={this.props.onKeyPress}
            onKeyUp={this.props.onKeyUp}
            pattern={this.props.pattern}
            placeholder={this.props.placeholder}
            readOnly={this.props.isReadOnly}
            required={this.props.required}
            spellCheck={this.props.isSpellCheckEnabled}
            type={this.props.type}
            value={this.props.value}
          />
        </Row>
      </Wrapper>
    );
  }
}

export { FieldTextStateless as FieldTextStatelessWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldText',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldText',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
      action: 'focused',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldText',
        packageName,
        packageVersion,
      },
    }),
  })(FieldTextStateless),
);
