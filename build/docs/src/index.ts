import React from 'react';
import defaultMd from 'react-markings';

const customMd = defaultMd.customize({
  renderers: {
    // customize heading with class
    // heading: props =>
    //   React.createElement(
    //     'h' + props.level,
    //     {
    //       className: `h${props.level === 1 ? '2 mb-4' : '5 mt-5'}`,
    //     },
    //     props.children,
    //   ),
    list: (props) =>
      React.createElement('ul', { className: '' }, props.children),
  },
});

export { Prop } from 'pretty-proptypes';
export { default as code } from './code';
export { default as Example } from './Example';
export { default as Props } from './Props';
export { default as replaceSrc } from './replaceSrc';
export { customMd as md };
