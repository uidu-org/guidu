import * as React from 'react';

export default function Image(
  props: { alt?: string; title?: string; src: string } & React.Props<any>,
) {
  return (
    <img
      className="renderer-image"
      src={props.src}
      alt={props.alt}
      title={props.title}
    />
  );
}
