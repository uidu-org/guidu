import * as React from 'react';
import { bulletListSelector } from '@uidu/adf-schema';

export default function BulletList(props: React.Props<any>) {
  return <ul className={bulletListSelector.substr(1)}>{props.children}</ul>;
}
