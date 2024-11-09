import React from 'react';
import { CodeBlock } from '../src';

const exampleCodeBlock = `  // React component
  class HelloMessage extends React.Component {
    render() {
      return (
        <div>
          Hello {this.props.name}
        </div>
      );
    }
  }

  ReactDOM.render(
    <HelloMessage name="Taylor" />,
    mountNode
  );
`;

export default function Component() {
  return (
    <GuidumeProvider mode="dark">
      <CodeBlock language="java" text={exampleCodeBlock} />
    </GuidumeProvider>
  );
}
