// @flow
import React, { type ComponentType, type ElementRef, Component } from 'react';
// we explicitly do not want to use our wrapped loadable here, as the modal being loaded should
// be handled by the iframe sendApdex
import Loadable from 'react-loadable';
import Loading from '../Loading';
import CodeBlock from '../Code';

type Props = {
  src: string | null,
  name: string,
  src: string,
  example: {
    contents: Function,
    exports: Function,
  },
  displayCode: boolean,
  render: (ComponentType<any>, ComponentType<any>, boolean) => any,
};

export default class ExampleDisplay extends Component<Props> {
  iframeRef: ElementRef<iframe>;
  constructor(props) {
    super(props);
    this.buildExampleComponents(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      if (
        this.iframeRef &&
        typeof this.iframeRef.contentWindow.unmountApp === 'function'
      ) {
        this.iframeRef.contentWindow.unmountApp();
      }
      this.buildExampleComponents(nextProps);
    }
  }
  componentWillUnmount() {
    if (
      this.iframeRef &&
      this.iframeRef.contentWindow &&
      typeof this.iframeRef.contentWindow.unmountApp === 'function'
    ) {
      this.iframeRef.contentWindow.unmountApp();
    }
  }
  buildExampleComponents = props => {
    this.ExampleCode = Loadable({
      loader: () => props.example.contents(),
      loading: Loading,
      render(loaded) {
        return (
          <CodeBlock grammar="jsx" content={loaded.default} name={props.name} />
        );
      },
    });
    this.Example = () => (
      <iframe
        ref={this.getIframeRef}
        title="example"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        src={props.src}
      />
    );
  };
  getIframeRef = ref => (this.iframeRef = ref);
  render() {
    if (!this.props.src) {
      console.error(
        'No source url provided for the examples iframe',
        this.props.src,
      );
      return;
    }

    return this.props.children(
      this.ExampleCode,
      this.Example,
      this.props.displayCode,
    );
  }
}
