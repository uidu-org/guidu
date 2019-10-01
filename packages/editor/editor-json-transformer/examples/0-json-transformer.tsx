import { Editor } from '@uidu/editor-core';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import styled from 'styled-components';
import { JSONTransformer } from '../src';

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  #output {
    border: 2px solid;
    margin: 8px;
    padding: 8px;
    white-space: pre-wrap;
    font-size: xx-small;
    &:focus {
      outline: none;
    }
    &:empty:not(:focus)::before {
      content: attr(data-placeholder);
      font-size: 14px;
    }
  }
`;

export default class Example extends React.PureComponent<
  {},
  { output: string }
> {
  state = { output: '' };
  transformer = new JSONTransformer();

  handleChangeInTheEditor = (editorView: EditorView) => {
    const output = JSON.stringify(
      this.transformer.encode(editorView.state.doc),
      null,
      2,
    );
    this.setState({ output });
  };

  render() {
    return (
      <Container>
        <Editor
          appearance="comment"
          allowCodeBlocks={true}
          allowLists={true}
          allowRule={true}
          allowTables={true}
          onChange={this.handleChangeInTheEditor}
        >
          {({ renderEditor }) => renderEditor()}
        </Editor>
        <div
          id="output"
          data-placeholder="This is an empty document (or something has gone really wrong)"
        >
          {this.state.output}
        </div>
      </Container>
    );
  }
}
