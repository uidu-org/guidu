// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import ControlCommon from './control-common';

// // A file control can only be set to an empty string.
// // I think we need to keep this as an uncontrolled component, so we override the
// // value.prop.
// class FileControl extends Component {
//   initElementRef = element => {
//     this.element = element;
//   };

//   focus = () => this.element.focus && this.element.focus();

//   render() {
//     const props = { ...this.props };
//     delete props.label;
//     delete props.value;

//     return (
//       <div className="custom-file">
//         <input
//           {...props}
//           className="custom-file-input"
//           type="file"
//           ref={this.initElementRef}
//         />
//         <label htmlFor={props.id} className="custom-file-label">
//           {props.placeholder}
//         </label>
//       </div>
//     );
//   }
// }

// FileControl.propTypes = {
//   ...ControlCommon.propTypes,
//   placeholder: PropTypes.string,
// };

// FileControl.defaultProps = {
//   placeholder: 'Choose file',
// };

// export default FileControl;
