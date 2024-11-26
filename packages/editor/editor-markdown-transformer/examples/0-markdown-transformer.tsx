import { Editor, EditorContext, WithEditorActions } from '@uidu/editor-core';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';
import exampleMarkdown from '../examples-utils/exampleMarkdown';
import { MarkdownTransformer } from '../src';

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  #source {
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

type Props = { actions: any };
type State = { source: string };

class Example extends React.PureComponent<Props, State> {
  state: State = { source: exampleMarkdown };

  componentDidMount() {
    // const transformer = new MarkdownTransformer(defaultSchema);
    // console.log(transformer.parse(exampleMarkdown));
    // const jsonTransformer = new JSONTransformer();
    // console.log(jsonTransformer.encode(transformer.parse(exampleMarkdown)));
    window.setTimeout(() => {
      this.props.actions.replaceDocument(this.state.source);
    });
  }

  handleUpdateToSource = (e: React.FormEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText;
    this.setState({ source: value }, () =>
      this.props.actions.replaceDocument(value),
    );
  };

  render() {
    return (
      <IntlProvider locale="en">
        <Container>
          <div
            id="source"
            contentEditable={true}
            data-placeholder="Enter Markdown to convert"
            onInput={this.handleUpdateToSource}
          >
            {exampleMarkdown}
          </div>
          <Editor
            appearance="comment"
            allowCodeBlocks={true}
            allowLists={true}
            allowRule={true}
            allowTables={true}
            onChange={(value) => {
              console.log(value);
            }}
            media={{
              allowMediaSingle: true,
            }}
            contentTransformerProvider={(schema) =>
              new MarkdownTransformer(schema)
            }
          >
            {({ renderEditor }) => <div tw="prose">{renderEditor()}</div>}
          </Editor>
        </Container>
      </IntlProvider>
    );
  }
}

export default () => (
  <EditorContext>
    <WithEditorActions render={(actions) => <Example actions={actions} />} />
  </EditorContext>
);
