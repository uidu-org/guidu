export const transitionToPromise = el =>
  new Promise(resolve => {
    const transitionEnded = () => {
      el.removeEventListener('transitionend', transitionEnded);
      resolve();
    };
    el.addEventListener('transitionend', transitionEnded);
  });
