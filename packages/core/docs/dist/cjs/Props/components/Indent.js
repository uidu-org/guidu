import React from 'react';
export default function Indent(props) {
  return React.createElement("div", {
    style: {
      paddingLeft: '1.3em'
    }
  }, props.children);
}