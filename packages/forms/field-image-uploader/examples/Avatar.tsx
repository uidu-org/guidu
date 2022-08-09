import Button from '@uidu/button';
import { FieldRangeStateless } from '@uidu/field-range';
import { Form } from '@uidu/form';
import React, { Component } from 'react';
import { ZoomIn, ZoomOut } from 'react-feather';
import { localUploadOptions } from '../../../media/media-core/src';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldImageUploader, { zoom, ZoomDirectionType } from '../src';

export default class Avatar extends Component<any, any> {
  render() {
    return (
      <Form {...formDefaultProps}>
        <div style={{ width: 140, height: 140, borderRadius: 140 }}>
          <FieldImageUploader
            {...inputDefaultProps}
            tw="aspect-w-1 aspect-h-1"
            borderRadius={140}
            toolbar={({ handleScale, scale }) => (
              <div tw="absolute left-full p-4 bg-blue-300 rounded-r flex flex-col justify-between top-0 h-full">
                <Button
                  iconBefore={<ZoomIn size={12} />}
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
                    value={scale}
                    onChange={(value) => {
                      handleScale(parseFloat(value));
                    }}
                  />
                </div>
                <Button
                  iconBefore={<ZoomOut size={12} />}
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
          />
        </div>
      </Form>
    );
  }
}
