import * as React from 'react';
import { orderedListSelector } from '@uidu/adf-schema';

export default function OrderedList(
  props: { start?: number } & React.Props<any>,
) {
  return (
    <ol className={orderedListSelector.substr(1)} start={props.start}>
      {props.children}
    </ol>
  );
}
