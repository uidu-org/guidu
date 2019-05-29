// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import autosize from 'autosize';
// import ControlCommon from './control-common';

// class TextareaControl extends Component {
//   componentDidMount() {
//     const { autoSize } = this.props;
//     if (autoSize) {
//       autosize(this.element);
//     }
//   }

//   initElementRef = element => {
//     this.element = element;
//   };

//   focus = () => this.element.focus && this.element.focus();

//   render() {
//     const inputProps = Object.assign({}, this.props);
//     delete inputProps.autoSize;
//     delete inputProps.isPristine;
//     delete inputProps.onResize;

//     return <textarea {...inputProps} ref={this.initElementRef} />;
//   }
// }

// TextareaControl.propTypes = {
//   ...ControlCommon.propTypes,
//   className: PropTypes.string,
//   value: PropTypes.string,
// };

// TextareaControl.defaultProps = {
//   className: 'form-control',
//   cols: 0, // React doesn't render the cols attribute if it is zero
//   rows: 3,
//   value: '',
// };

// export default TextareaControl;
