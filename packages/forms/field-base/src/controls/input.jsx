// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import ControlCommon from './control-common';

// class InputControl extends Component {
//   initElementRef = element => {
//     this.element = element;
//   };

//   focus = () => this.element.focus && this.element.focus();

//   render() {
//     const { isPristine, showErrors, type } = this.props;
//     const inputProps = Object.assign({}, this.props);

//     let { className } = this.props;
//     if (['hidden', 'range'].indexOf(type) !== -1) {
//       className = null;
//     }

//     delete inputProps.isPristine;
//     delete inputProps.floatLabel;
//     delete inputProps.showErrors;

//     return (
//       <input
//         {...inputProps}
//         className={classNames(className, {
//           'is-valid': !isPristine && !showErrors,
//           'is-invalid': !isPristine && showErrors,
//         })}
//         ref={this.initElementRef}
//       />
//     );
//   }
// }

// InputControl.propTypes = {
//   ...ControlCommon.propTypes,
//   type: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   className: PropTypes.string,
// };

// InputControl.defaultProps = {
//   className: 'form-control',
// };

// export default InputControl;
