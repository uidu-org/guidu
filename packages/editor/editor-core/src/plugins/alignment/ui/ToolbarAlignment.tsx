import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup } from '@uidu/button';
import { ButtonItem, MenuGroup } from '@uidu/menu';
import Popup, { TriggerProps } from '@uidu/popup';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import ToolbarButton from '../../../ui/ToolbarButton';
import { AlignmentPluginState, AlignmentState } from '../types';

export const iconMap = {
  start: <FontAwesomeIcon icon={faAlignLeft} />,
  end: <FontAwesomeIcon icon={faAlignRight} />,
  center: <FontAwesomeIcon icon={faAlignCenter} />,
};

export interface Props {
  pluginState: AlignmentPluginState;
  changeAlignment: (align: AlignmentState) => void;
  disabled?: boolean;
}

function ToolbarAlignment({ changeAlignment, pluginState, disabled }: Props) {
  const intl = useIntl();

  const [isOpen, setIsOpen] = useState(false);

  const alignmentOptions: Array<{ title: string; value: AlignmentState }> =
    useMemo(
      () => [
        {
          title: intl.formatMessage({
            defaultMessage: 'Align left',
            id: 'editor-core.alignment.left',
          }),
          value: 'start',
        },
        {
          title: intl.formatMessage({
            defaultMessage: 'Align center',
            id: 'editor-core.alignment.center',
          }),
          value: 'center',
        },
        {
          title: intl.formatMessage({
            defaultMessage: 'Align right',
            id: 'editor-core.alignment.right',
          }),
          value: 'end',
        },
      ],
      [],
    );

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <ButtonGroup>
        <ToolbarButton
          disabled={disabled}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...triggerProps}
          onClick={() => setIsOpen((prev) => !prev)}
          iconBefore={<div tw="text-base">{iconMap[pluginState.align]}</div>}
        />
      </ButtonGroup>
    ),
    [pluginState.align, disabled],
  );

  const Content = useCallback(
    () => (
      <MenuGroup>
        {alignmentOptions.map((alignment) => {
          const { value, title } = alignment;
          return (
            <ButtonItem
              key={value}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen((prev) => !prev);
                changeAlignment(value);
              }}
              isSelected={value === pluginState.align}
              iconBefore={iconMap[value]}
            >
              {title}
            </ButtonItem>
          );
        })}
      </MenuGroup>
    ),
    [changeAlignment, pluginState.align, alignmentOptions],
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      trigger={Trigger}
      content={Content}
      placement="bottom-start"
    />
  );
}

export default memo(ToolbarAlignment);
