import * as React from 'react';

const { Provider, Consumer } = React.createContext<
  (ref: HTMLDivElement) => void
>(() => {});

export { Provider as EditorContentProvider };

export class EditorContent extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Consumer>
        {handleRef => <div style={{ height: '100%' }} ref={handleRef} />}
      </Consumer>
    );
  }
}
