// @flow
import React from 'react';
import defaultMd from 'react-markings';

const customMd = defaultMd.customize({
  renderers: {
    // customize heading with class
    heading: props =>
      React.createElement(
        'h' + props.level,
        {
          className: `h${
            props.level > 4 && props.level < 2 ? props.level : props.level + 2
          } mt-5`,
        },
        props.children,
      ),
    list: props =>
      React.createElement('ul', { className: 'list-unstyled' }, props.children),
  },
});

export { default as code } from './code';
export { default as Example } from './Example';
export { default as Props } from './Props';
export { default as replaceSrc } from './replaceSrc';
export { Prop } from 'pretty-proptypes';
export { customMd as md };
