import React from 'react';

export const clipboardApiSupported = () => {
  if (window) {
    if (!navigator) {
      return false;
    }
    return (
      !!navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    );
  }
  return false;
};

// This function is needed for safari and IE.
// This function is a synchronous function, but it is wrapped into a promise
// to be consistent with "copyToClipboard".
export const copyToClipboardLegacy = (
  textToCopy: string,
  copyAreaRef: HTMLElement | null,
): Promise<void> =>
  new Promise<void>((resolve: () => void, reject: (str: string) => void) => {
    if (copyAreaRef) {
      const textArea = document.createElement('textarea');
      textArea.readOnly = true;
      textArea.defaultValue = textToCopy;
      copyAreaRef.appendChild(textArea);
      textArea.select();
      const wasCopied = document.execCommand('copy');
      copyAreaRef.removeChild(textArea);

      if (wasCopied) {
        resolve();
      } else {
        reject('Failed to copy');
      }
    } else {
      reject('Copy area reference is not defined');
    }
  });

export const copyToClipboard = (textToCopy: string): Promise<void> =>
  new Promise<void>((resolve: () => void, reject: (str: string) => void) => {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      navigator.clipboard.writeText(textToCopy).then(
        () => resolve(),
        (e) => reject(e),
      );
    } else {
      reject('Clipboard api is not supported');
    }
  });

const isClipboardApiSupported = clipboardApiSupported();

const CopyTextContext = React.createContext<{
  copyTextToClipboard: (textToCopy: string) => Promise<void>;
}>({
  copyTextToClipboard: () =>
    new Promise<void>((_resolve, reject) =>
      reject('"copyTextToClipboard" is not initialized'),
    ),
});

const { Provider, Consumer } = CopyTextContext;

export const CopyArea = React.forwardRef((props: any, ref) => (
  <div
    ref={ref}
    style={{
      position: 'absolute',
      left: '-9999px',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
    }}
    {...props}
  />
));

export class CopyTextProvider extends React.Component {
  private copyAreaRef: React.RefObject<HTMLElement> = React.createRef();

  copyTextToClipboard = (textToCopy: string): Promise<void> => {
    if (isClipboardApiSupported) {
      return copyToClipboard(textToCopy);
    } else {
      return copyToClipboardLegacy(textToCopy, this.copyAreaRef.current);
    }
  };

  render() {
    return (
      <>
        {!isClipboardApiSupported && <CopyArea ref={this.copyAreaRef} />}
        <Provider
          value={{
            copyTextToClipboard: this.copyTextToClipboard,
          }}
        >
          {this.props.children}
        </Provider>
      </>
    );
  }
}

export { Consumer as CopyTextConsumer };
export { CopyTextContext };
