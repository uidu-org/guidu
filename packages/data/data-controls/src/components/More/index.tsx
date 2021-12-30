import { ButtonItem, MenuGroup, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useState } from 'react';
import {
  Clipboard,
  Download,
  Edit2,
  MoreHorizontal,
  Settings,
  Trash,
} from 'react-feather';
import { Trigger } from '../../styled';
import { MoreProps } from './types';

export default function More({
  onDownload,
  onDuplicate,
  onRename,
  onDestroy,
}: MoreProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const actions = [
    {
      text: 'Rename view',
      onClick: onRename,
      icon: Edit2,
    },
    {
      text: 'Duplicate view',
      onClick: onDuplicate,
      icon: Clipboard,
    },
    {
      text: "Copy another view's configuration",
      onClick: onDuplicate,
      icon: Settings,
    },
    {
      text: 'Export .csv',
      onClick: onDownload,
      icon: Download,
    },
    {
      text: 'Destroy view',
      onClick: onDestroy,
      icon: Trash,
    },
  ];

  return (
    <Popup
      onClose={() => setIsDialogOpen(false)}
      isOpen={isDialogOpen}
      trigger={(triggerProps) => (
        <Trigger
          {...triggerProps}
          onClick={() =>
            setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen)
          }
          activeBg="#fee2d5"
          active={false}
          iconBefore={<MoreHorizontal strokeWidth={2} size={14} />}
        />
      )}
      content={() => (
        <MenuGroup>
          <Section>
            {actions.map(({ onClick, text, icon: Icon }) => (
              <ButtonItem
                key={text}
                onClick={onClick}
                iconBefore={<Icon size={14} />}
              >
                {text}
              </ButtonItem>
            ))}
          </Section>
        </MenuGroup>
      )}
      placement="bottom-start"
    />
  );
}
