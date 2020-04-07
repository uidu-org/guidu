import { bulletListSelector } from '@uidu/adf-schema';
import * as React from 'react';

export default function BulletList(props: React.Props<any>) {
  return <ul className={bulletListSelector.substr(1)}>{props.children}</ul>;
}
