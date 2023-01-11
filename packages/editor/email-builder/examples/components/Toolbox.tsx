import { Element, useEditor } from '@craftjs/core';
import React from 'react';

import { Button, Container, Divider, Text, Video } from '../../src';

export default function Toolbox() {
  const { connectors } = useEditor();

  return (
    <div>
      <div>
        <p>Drag to add</p>
      </div>
      <div tw="grid grid-cols-1 gap-4 p-4">
        <div>
          <button
            ref={(ref) => connectors.create(ref, <Text content={[]} />)}
            tw="p-6 border rounded text-center w-full"
            data-cy="toolbox-text"
          >
            Text
          </button>
        </div>
        <div>
          <button
            ref={(ref) =>
              connectors.create(
                ref,
                <Element canvas is={Container} padding={20} />,
              )
            }
            tw="p-6 border rounded text-center w-full"
            data-cy="toolbox-container"
          >
            Container
          </button>
        </div>
        <div>
          <button
            ref={(ref) => connectors.create(ref, <Button text="Hi world" />)}
            tw="p-6 border rounded text-center w-full"
            data-cy="toolbox-container"
          >
            Button
          </button>
        </div>
        <div>
          <button
            ref={(ref) =>
              connectors.create(
                ref,
                <Video url="https://www.youtube.com/watch?v=Q1M4tKmBM7k" />,
              )
            }
            tw="p-6 border rounded text-center w-full"
            data-cy="toolbox-container"
          >
            Video
          </button>
        </div>
        <div>
          <button
            ref={(ref) => connectors.create(ref, <Divider />)}
            tw="p-6 border rounded text-center w-full"
            data-cy="toolbox-container"
          >
            Divider
          </button>
        </div>
        <div>
          <button
            ref={(ref) => connectors.create(ref, <Button text="Hi world" />)}
            tw="p-6 border rounded text-center w-full"
            data-cy="toolbox-container"
          >
            Image
          </button>
        </div>
      </div>
    </div>
  );
}
