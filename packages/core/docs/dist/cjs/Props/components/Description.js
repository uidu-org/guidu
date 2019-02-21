import React from 'react';
export default function ReadmeDescription({
  children
}) {
  const style = {
    marginTop: 12
  };
  return typeof children === 'string' ? React.createElement("p", null, children) : React.createElement("div", {
    style: style
  }, children);
}