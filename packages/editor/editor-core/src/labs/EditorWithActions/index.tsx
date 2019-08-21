import * as PropTypes from 'prop-types';
import * as React from 'react';
import EditorActions from '../../actions';
import EditorContext from '../../components/EditorContext';
import WithEditorActions from '../../components/WithEditorActions';
import Editor, { EditorProps } from '../../editor';

export interface EditorWithActionsPropsOverride extends EditorProps {
  onSave?: any;
  onChange?: any;
  onCancel?: any;
}
export interface EditorWithActionsProps extends EditorWithActionsPropsOverride {
  onSave?: (actions: EditorActions) => void;
  onChange?: (actions: EditorActions) => void;
  onCancel?: (actions: EditorActions) => void;
}

export default class EditorWithActions extends React.Component<
  EditorWithActionsProps,
  {}
> {
  static contextTypes = {
    editorActions: PropTypes.object.isRequired,
  };
  context!: {
    editorActions?: EditorActions;
  };

  handleSave = (actions: EditorActions) => () => {
    this.props.onSave!(actions);
  };
  handleCancel = (actions: EditorActions) => () => {
    this.props.onCancel!(actions);
  };
  handleChange = (actions: EditorActions) => () => {
    this.props.onChange!(actions);
  };

  render() {
    if (this.context.editorActions) {
      const { editorActions: actions } = this.context;
      return (
        <Editor
          {...this.props}
          onSave={this.props.onSave ? this.handleSave(actions) : undefined}
          onChange={
            this.props.onChange ? this.handleChange(actions) : undefined
          }
          onCancel={
            this.props.onCancel ? this.handleCancel(actions) : undefined
          }
        />
      );
    }
    return (
      <EditorContext>
        <WithEditorActions
          render={actions => (
            <Editor
              {...this.props}
              onSave={this.props.onSave ? this.handleSave(actions) : undefined}
              onChange={
                this.props.onChange ? this.handleChange(actions) : undefined
              }
              onCancel={
                this.props.onCancel ? this.handleCancel(actions) : undefined
              }
            />
          )}
        />
      </EditorContext>
    );
  }
}
