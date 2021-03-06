import classNames from 'classnames';
import React, { PureComponent } from 'react';
import Label from '../Label';
import { RowProps } from './types';

export default class Row extends PureComponent<RowProps> {
  static defaultProps = {
    label: null,
    rowClassName: '',
    labelClassName: '',
    elementWrapperClassName: '',
    required: false,
    showErrors: false,
    fakeLabel: false,
  };

  render() {
    const {
      elementWrapperClassName,
      required,
      rowClassName,
      layout,
      label,
      showErrors,
    } = this.props;

    let element = this.props.children;

    if (layout === 'elementOnly') {
      return element;
    }

    const cssClasses = {
      row: ['form-group'],
      elementWrapper: [],
    };

    if (showErrors) {
      cssClasses.row.push('has-error');
      cssClasses.row.push('has-feedback');
    }

    // We should render the label if there is label text defined, or if the
    // component is required (so a required symbol is displayed in the label tag)
    const shouldRenderLabel = label !== null || required;

    if (layout === 'horizontal') {
      // Horizontal layout needs a 'row' class for Bootstrap 4
      cssClasses.row.push('row');

      if (!shouldRenderLabel) {
        cssClasses.elementWrapper.push('col-sm-offset-3');
      }

      cssClasses.elementWrapper.push('col-sm-9');
      cssClasses.elementWrapper.push(elementWrapperClassName);

      element = (
        <div className={classNames(cssClasses.elementWrapper)}>{element}</div>
      );
    }

    cssClasses.row.push(rowClassName);

    return (
      <div className={classNames(cssClasses.row)}>
        {shouldRenderLabel ? <Label {...this.props} /> : null}
        {element}
      </div>
    );
  }
}
