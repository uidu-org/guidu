import React from 'react';
import { RendererCssClassName } from '../../consts';

export default function Doc(props) {
  return <div className={RendererCssClassName.DOCUMENT}>{props.children}</div>;
}
