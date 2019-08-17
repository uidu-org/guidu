import { Children, Component } from 'react';

class FormOptionsProvider extends Component<any> {
  static defaultProps = {
    layout: 'vertical',
    validateOnSubmit: false,
    validatePristine: false,
    rowClassName: '',
    labelClassName: '',
    elementWrapperClassName: '',
  };

  getChildContext() {
    return {
      layout: this.props.layout,
      validateOnSubmit: this.props.validateOnSubmit,
      validatePristine: this.props.validatePristine,
      rowClassName: this.props.rowClassName,
      labelClassName: this.props.labelClassName,
      elementWrapperClassName: this.props.elementWrapperClassName,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

// const classNamesType = PropTypes.oneOfType([
//   PropTypes.string,
//   PropTypes.array,
//   PropTypes.object,
// ]);

// const propTypes = {
//   layout: PropTypes.string,
//   validateOnSubmit: PropTypes.bool,
//   validatePristine: PropTypes.bool,
//   elementWrapperClassName: classNamesType,
//   labelClassName: classNamesType,
//   rowClassName: classNamesType,
// };

// FormOptionsProvider.propTypes = {
//   ...propTypes,
//   children: PropTypes.node.isRequired,
// };

// FormOptionsProvider.childContextTypes = propTypes;

export default FormOptionsProvider;
