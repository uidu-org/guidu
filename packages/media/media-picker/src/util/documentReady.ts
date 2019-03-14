import * as exenv from 'exenv';
// https://gist.github.com/dragosh/e9baf2d7bf3673a98c91
const checkDomReady = (): Promise<{} | void> => {
  if (document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    window.addEventListener('load', resolve);
  });
};

export const whenDomReady = exenv.canUseDOM
  ? checkDomReady()
  : Promise.resolve();
