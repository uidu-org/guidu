/* eslint-disable react/prop-types */
import Checkbox from '@atlaskit/icon/glyph/checkbox';
import Radio from '@atlaskit/icon/glyph/radio';
import Tooltip from '@uidu/tooltip';
import React, { PureComponent } from 'react';
import {
  After,
  Before,
  Content,
  ContentWrapper,
  Description,
  InputWrapper,
} from '../styled/Item';
import { getInputBackground, getInputFill } from '../utils';
import Element from './Element';

const inputTypes = { checkbox: Checkbox, radio: Radio };

class Item extends PureComponent<any> {
  static defaultProps = {
    appearance: 'default',
    children: null,
    description: '',
    elemAfter: null,
    elemBefore: null,
    href: null,
    isActive: false,
    isChecked: false,
    isDisabled: false,
    isFocused: false,
    isHidden: false,
    isSelected: false,
    itemContext: 'menu',
    onActivate: () => {},
    target: null,
    title: null,
    tooltipDescription: null,
    tooltipPosition: 'right',
    type: 'link',
  };

  state = {
    isHovered: false,
    isPressed: false,
  };

  componentDidMount = () =>
    document.addEventListener('mouseup', this.handleMouseUp);

  componentWillUnmount = () =>
    document.removeEventListener('mouseup', this.handleMouseUp);

  guardedActivate = (event) => {
    const { isDisabled, onActivate } = this.props;

    if (!isDisabled && onActivate) onActivate({ item: this, event });
  };

  handleClick = (event) => this.guardedActivate(event);

  handleKeyPress = (event) => {
    const keyIsValid = ['Enter', ' '].indexOf(event.key) > -1;

    if (keyIsValid) this.guardedActivate(event);
  };

  handleMouseDown = () => this.setState({ isPressed: true });

  handleMouseUp = () => this.setState({ isPressed: false });

  handleMouseOut = () => this.setState({ isHovered: false });

  handleMouseOver = () => this.setState({ isHovered: true });

  render() {
    const { props } = this;
    const { isHovered, isPressed } = this.state;

    const type = props.type || '';
    const hasInput = ['checkbox', 'radio'].indexOf(type) > -1;
    const Input = inputTypes[type];

    const appearanceProps = {
      isActive:
        (props.type === 'link' && props.isActive) ||
        (props.type === 'option' && props.isSelected),
      isChecked: ['checkbox', 'radio'].indexOf(type) > -1 && props.isChecked,
      isDisabled: props.isDisabled,
      isFocused: props.isFocused,
      isHidden: props.isHidden,
      isHovered,
      isPressed,
      isSelected: type === 'option' && props.isSelected,
      isPrimary: props.appearance === 'primary',
    };

    const element = (
      <Element
        {...appearanceProps}
        handleClick={this.handleClick}
        handleKeyPress={this.handleKeyPress}
        handleMouseOut={this.handleMouseOut}
        handleMouseOver={this.handleMouseOver}
        handleMouseUp={this.handleMouseUp}
        handleMouseDown={this.handleMouseDown}
        href={props.href}
        target={props.target}
        title={props.title}
        type={props.type}
      >
        {hasInput && (
          <InputWrapper {...appearanceProps}>
            <Input
              label=""
              primaryColor={getInputBackground(appearanceProps)}
              secondaryColor={getInputFill(appearanceProps)}
              size="medium"
            />
          </InputWrapper>
        )}
        {!!props.elemBefore && <Before>{props.elemBefore}</Before>}
        <ContentWrapper>
          <Content>{props.children}</Content>
          {!!props.description && (
            <Description>{props.description}</Description>
          )}
        </ContentWrapper>
        {!!props.elemAfter && <After>{props.elemAfter}</After>}
      </Element>
    );

    return (
      <span role="presentation">
        {props.tooltipDescription ? (
          <Tooltip
            content={props.tooltipDescription}
            position={props.tooltipPosition}
          >
            {element}
          </Tooltip>
        ) : (
          element
        )}
      </span>
    );
  }
}

export { Item };

export default Item;
