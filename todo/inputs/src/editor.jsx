import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import { exec, init } from 'pell';

import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import TextareaControl from './controls/textarea';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.changeDebounced = debounce(
      props.onSetValue,
      props.changeDebounceInterval,
    );
    this.blurDebounced = debounce(props.onSetValue, props.blurDebounceInterval);
  }

  // componentWillReceiveProps = (nextProps) => {
  // const isValueChanging = nextProps.value !== this.props.value;
  // if (isValueChanging) {
  //   this.setState({ value: nextProps.value });
  //   this.props.onSetValue(nextProps.value);
  // }
  // };

  componentDidMount() {
    const editor = init({
      // <HTMLElement>, required
      element: this.element,
      // <Function>, required
      // Use the output html, triggered by element's `oninput` event
      onChange: this.handleChange,
      // <string>, optional, default = 'div'
      // Instructs the editor which element to inject via the return key
      defaultParagraphSeparator: 'div',
      // <Array[string | Object]>, string if overwriting, object if customizing/creating
      // action.name<string> (only required if overwriting)
      // action.icon<string> (optional if overwriting, required if custom action)
      // action.title<string> (optional)
      // action.result<Function> (required)
      // Specify the actions you specifically want (in order)
      actions: [
        'bold',
        'italic',
        // {
        //   name: 'custom',
        //   icon: 'C',
        //   title: 'Custom Action',
        //   result: () => console.log('Do something!'),
        // },
        'underline',
        'heading1',
        'heading2',
        'paragraph',
        'olist',
        'ulist',
        // 'link',
        // 'image',
      ],
    });
    editor.content.innerHTML = this.props.value;
  }

  handleChange = value => {
    // let value = '';
    // if (editorState.getCurrentContent().getPlainText() !== '') {
    //   value = mediumDraftExporter(editorState.getCurrentContent());
    // }
    if (this.props.updateOnChange) {
      this.changeDebounced(value);
    }
    this.props.onChange(this.props.name, value);
  };

  handleBlur = event => {
    const { value } = event.currentTarget;
    // this.setState({ value });
    if (this.props.updateOnBlur) {
      this.changeDebounced.cancel();
      this.blurDebounced(value);
    }
    this.props.onBlur(this.props.name, value);
  };

  initElementRef = control => {
    this.element = control;
  };

  // getRawContentState = () => {
  //   return convertToRaw(this.element.getEditorState().getCurrentContent());
  // };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });
    delete inputProps.blurDebounceInterval;
    delete inputProps.changeDebounceInterval;
    delete inputProps.updateOnBlur;
    delete inputProps.updateOnChange;

    const element = (
      <div
        className="form-control form-control-autosize"
        style={{ height: 'auto' }}
        ref={this.initElementRef}
      />
    );

    if (this.props.layout === 'elementOnly') {
      return element;
    }

    return (
      <Row {...this.props} htmlFor={this.props.id}>
        {element}
        {this.props.help ? <Help help={this.props.help} /> : null}
        {this.props.showErrors ? (
          <ErrorMessages messages={this.props.errorMessages} />
        ) : null}
      </Row>
    );
  }
}

Editor.propTypes = {
  ...ComponentCommon.propTypes,
  ...TextareaControl.propTypes,
  blurDebounceInterval: PropTypes.number,
  changeDebounceInterval: PropTypes.number,
  updateOnBlur: PropTypes.bool,
  updateOnChange: PropTypes.bool,
  value: PropTypes.string,
  onBlur: PropTypes.func,
};

Editor.defaultProps = {
  ...ComponentCommon.defaultProps,
  updateOnBlur: true,
  updateOnChange: true,
  blurDebounceInterval: 0,
  changeDebounceInterval: 0,
  onBlur: () => {},
};

export default Editor;

// <PlainEditor
//   {...inputProps}
//   value={
//     this.props.value
//       ? convertToRaw(mediumDraftImporter(this.props.value))
//       : convertToRaw(mediumDraftImporter(''))
//   }
//   onChange={this.handleChange}
//   onBlur={this.handleBlur}

// />
