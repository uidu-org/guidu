import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from '@heroicons/react/24/outline';
import Button from '@uidu/button';
import { FieldRangeStateless } from '@uidu/field-range';
import React from 'react';
import { localUploadOptions } from '../../../media/media-core/src';
import {
  FieldExampleScaffold,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import FieldImageUploader, {
  FieldImageUploaderProps,
  zoom,
  ZoomDirectionType,
} from '../src';

export default function Avatar() {
  return (
    <FieldExampleScaffold<FieldImageUploaderProps>
      component={FieldImageUploader}
      borderRadius={140}
      toolbar={({ handleScale, scale }) => (
        <div tw="absolute left-full p-4 bg-blue-300 rounded-r flex flex-col justify-between top-0 h-full">
          <Button
            iconBefore={<MagnifyingGlassPlusIcon tw="h-4 w-4" />}
            onClick={() =>
              zoom({
                direction: ZoomDirectionType.IN,
                callbackFn: handleScale,
                scale,
              })
            }
          />
          <div tw="-rotate-90">
            <FieldRangeStateless
              min={1}
              max={2}
              step={0.01}
              value={[scale]}
              onChange={(value) => {
                handleScale(parseFloat(value));
              }}
            />
          </div>
          <Button
            iconBefore={<MagnifyingGlassMinusIcon tw="h-4 w-4" />}
            onClick={() => {
              zoom({
                direction: ZoomDirectionType.OUT,
                callbackFn: handleScale,
                scale,
              });
            }}
          />
        </div>
      )}
      onChange={console.log}
      // onBlur={this.onBlur}
      // onFocus={this.onFocus}
      label={null}
      uploadOptions={localUploadOptions({
        endpoint: 'https://uidu.uidu.local:8443/upload',
      })}
      {...inputDefaultProps}
      tw="aspect-w-1 aspect-h-1"
    />
  );
}
