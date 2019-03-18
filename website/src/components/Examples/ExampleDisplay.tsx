import * as React from 'react';
// we explicitly do not want to use our wrapped loadable here, as the modal being loaded should
// be handled by the iframe sendApdex
import Loadable from 'react-loadable';
import Loading from '../Loading';
import CodeBlock from '../Code';
import { Window } from '../../types';

export type Props = {
  children?: (
    a: React.ComponentType,
    b: React.ComponentType,
    c: boolean,
  ) => React.ReactChild;
  src: string | null;
  name: string;
  example: {
    contents: Function;
    exports: Function;
  };
  displayCode: boolean;
  render?: (
    component1: React.ComponentType,
    component2: React.ComponentType,
    param: boolean,
  ) => JSX.Element;
};

export type Example = {
  default: string;
};

export default class ExampleDisplay extends React.Component<Props> {
  iframeRef: HTMLIFrameElement;
  ExampleCode:
    | (React.ComponentClass & Loadable.LoadableComponent)
    | (React.StatelessComponent & Loadable.LoadableComponent);
  Example: () => JSX.Element;
  constructor(props) {
    super(props);
    this.buildExampleComponents(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      const contentWindow =
        this.iframeRef &&
        (this.iframeRef.contentWindow as
          | null
          | Window & { unmountApp?: Function });

      if (contentWindow && contentWindow.unmountApp) {
        contentWindow.unmountApp();
      }
      this.buildExampleComponents(nextProps);
    }
  }
  componentWillUnmount() {
    const contentWindow =
      this.iframeRef &&
      (this.iframeRef.contentWindow as
        | null
        | Window & { unmountApp?: Function });

    if (contentWindow && contentWindow.unmountApp) {
      contentWindow.unmountApp();
    }
  }
  buildExampleComponents = props => {
    this.ExampleCode = Loadable({
      loader: () => props.example.contents(),
      loading: () => <Loading {...props} />,
      render(loaded: Example) {
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
    if (this.props.children)
      return this.props.children(
        this.ExampleCode,
        this.Example,
        this.props.displayCode,
      );
  }
}
