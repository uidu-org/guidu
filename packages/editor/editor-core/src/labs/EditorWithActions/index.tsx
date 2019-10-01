import * as PropTypes from 'prop-types';
import * as React from 'react';
import EditorActions from '../../actions';
import Editor from '../../editor';
import EditorContext from '../../ui/EditorContext';
import WithEditorActions from '../../ui/WithEditorActions';

export interface EditorWithActionsPropsOverride {
  onSave?: any;
  onChange?: any;
  onCancel?: any;
}
export interface EditorWithActionsProps extends EditorWithActionsPropsOverride {
  onSave?: (actions: EditorActions) => void;
  onChange?: (actions: EditorActions) => void;
  onCancel?: (actions: EditorActions) => void;
}

export default class EditorWithActions extends React.Component<any, {}> {
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
        >
          {({ renderEditor, renderToolbar }) => (
            <>
              {renderToolbar({})}
              {renderEditor({})}
            </>
          )}
        </Editor>
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
            >
              {({ renderEditor, renderToolbar }) => (
                <>
                  {renderToolbar({})}
                  {renderEditor({})}
                </>
              )}
            </Editor>
          )}
        />
      </EditorContext>
    );
  }
}
