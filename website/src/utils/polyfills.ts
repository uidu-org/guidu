const global = globalThis; //<- this should be enough
(window as any).global = window;
(global as any).Buffer = (global as any).Buffer || require('buffer').Buffer;
(window as any).process = {
  version: '',
};
