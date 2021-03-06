import React from 'react';
import Layer from '../src';
import type { Props } from '../src/components/Layer';

const relativeDiv = {
  position: 'relative',
  top: '200px',
  left: '200px',
};

const alignmentContainer = {
  height: '100px',
  width: '100px',
  backgroundColor: '#eee',
  display: 'inline-block',
};

type ExampleProps = Props & {
  longContent: boolean;
};

const PopperContent = (props: ExampleProps) => (
  <div style={{ background: '#fca' }}>
    {props.longContent ? (
      <div>
        <p>This is the layer content</p>
        <p>It should be positioned with position: {props.position}</p>
      </div>
    ) : (
      props.position
    )}
    <p>{props.content}</p>
  </div>
);

const ExampleAlignment = (props: ExampleProps) => (
  <Layer {...props} content={<PopperContent {...props} />}>
    <div style={alignmentContainer} />
  </Layer>
);

export default () => (
  <div style={{ height: '100%' }}>
    <div style={relativeDiv}>
      <ExampleAlignment
        position="bottom center"
        content="Parent is position: relative"
        longContent
      />
    </div>
  </div>
);
