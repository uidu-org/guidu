const warnOnce = (() => {
  return () => {
    if (window.hasWarnedAboutJsdomFixtures) {
      return;
    }
    // tslint:disable-next-line:no-console
    console.warn(
      'Warning! Test depends on DOM selection API which is not supported in JSDOM/Node environment.',
    );
    window.hasWarnedAboutJsdomFixtures = true;
  };
})();

const clientRectFixture = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

const selectionFixture = {
  removeAllRanges: () => {},
  addRange: () => {},
};

const rangeFixture = {
  setEnd: () => {},
  setStart: () => {},
  collapse: () => {},
  getClientRects: () => [],
  getBoundingClientRect: () => clientRectFixture,
};

if (typeof window !== 'undefined') {
  window.getSelection = () => {
    warnOnce();
    return selectionFixture;
  };
}

if (typeof document !== 'undefined') {
  document.getSelection = () => {
    warnOnce();
    return selectionFixture;
  };

  // Do nothing when attempting to create DOM ranges
  document.createRange = () => {
    warnOnce();
    return rangeFixture;
  };

  if (!('getClientRects' in document.createElement('div'))) {
    Element.prototype.getClientRects = () => [];
    Element.prototype.getBoundingClientRect = () => clientRectFixture;
  }
}
