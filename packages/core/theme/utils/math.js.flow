// @flow

export function add<P: Object>(fn: (props: P) => number, addend: number) {
  return (props: P) => fn(props) + addend;
}

export function subtract<P: Object>(
  fn: (props: P) => number,
  subtrahend: number,
) {
  return (props: P) => fn(props) - subtrahend;
}

export function multiply<P: Object>(fn: (props: P) => number, factor: number) {
  return (props: P) => fn(props) * factor;
}

export function divide<P: Object>(fn: (props: P) => number, divisor: number) {
  return (props: P) => fn(props) / divisor;
}
