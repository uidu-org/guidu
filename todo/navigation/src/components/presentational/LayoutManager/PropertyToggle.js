// @flow

import React, { PureComponent } from 'react';

type ObjectType = { [key: string]: string };
type Keys = Array<string>;
type Props = {
  attributes: ObjectType,
  styles: ObjectType,
  target: HTMLElement,
};

class PropertyToggle extends PureComponent<Props> {
  originalAttributes: ObjectType = {};
  originalStyles: ObjectType = {};
  attributeKeys: Keys;
  styleKeys: Keys;

  componentDidMount() {
    const { attributes, styles, target } = this.props;
    this.attributeKeys = Object.keys(attributes);
    this.styleKeys = Object.keys(styles);

    // styles
    if (this.styleKeys.length) {
      this.styleKeys.forEach(k => {
        this.originalStyles[k] = target.style.getPropertyValue(k);
        target.style.setProperty(k, styles[k]);
      });
    }

    // attributes
    if (this.attributeKeys.length) {
      this.attributeKeys.forEach(k => {
        this.originalAttributes[k] = target.getAttribute(k) || '';
        target.setAttribute(k, attributes[k]);
      });
    }
  }
  componentWillUnmount() {
    const { target } = this.props;

    // styles
    if (this.styleKeys.length) {
      this.styleKeys.forEach(k => {
        target.style.setProperty(k, this.originalStyles[k]);
      });
    }

    // attributes
    if (this.attributeKeys.length) {
      this.attributeKeys.forEach(k => {
        if (this.originalAttributes[k]) {
          target.setAttribute(k, this.originalAttributes[k]);
        } else {
          target.removeAttribute(k);
        }
      });
    }
  }
  render() {
    return null;
  }
}

type ProviderProps = { isActive: boolean };
const LifeCycleProvider = ({ isActive, ...props }: Props & ProviderProps) =>
  isActive ? <PropertyToggle {...props} /> : null;

// appease flow
const defaultTarget = (((typeof document !== 'undefined'
  ? document.body
  : null): any): HTMLElement);

LifeCycleProvider.defaultProps = {
  attributes: {},
  target: defaultTarget,
  styles: {},
};

export default LifeCycleProvider;
