/* eslint-disable react/jsx-props-no-spreading */
import { Icon } from '@fluentui/react/lib/Icon';
import {
  ArrowPathIcon,
  CheckIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Button, { ButtonGroup } from '@uidu/button';
import { ButtonItem, MenuGroup } from '@uidu/menu';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import React from 'react';

export type FileListProps = {
  uppy: Uppy;
};

export default function FileList({ uppy }: FileListProps) {
  if (uppy.getFiles().length === 0) {
    return null;
  }

  return (
    <div tw="my-4">
      <MenuGroup>
        {uppy.getFiles().map((file) => (
          <ButtonItem
            iconBefore={
              <Icon
                {...getFileTypeIconProps({
                  extension: file.extension,
                  size: 16,
                })}
                tw="flex items-center"
              />
            }
            iconAfter={
              <ButtonGroup appearance="link">
                <Button
                  tw="p-1.5"
                  iconBefore={<TrashIcon tw="h-5 w-5" />}
                  onClick={() => {
                    uppy.removeFile(file.id);
                  }}
                />
                <Button
                  tw="p-1.5"
                  iconBefore={
                    file.progress.uploadComplete ? (
                      <CheckIcon tw="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowPathIcon tw="h-5 w-5 animate-spin" />
                    )
                  }
                />
              </ButtonGroup>
            }
          >
            {file.name}
          </ButtonItem>
        ))}
      </MenuGroup>
    </div>
  );
}
