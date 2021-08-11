/** @jsxImportSource @emotion/react */
import MoreIcon from '@atlaskit/icon/glyph/more';
import Button from '@uidu/button';
import { N700 } from '@uidu/theme/colors';
import { borderRadius } from '@uidu/theme/constants';
import React, { forwardRef, useState } from 'react';
import Popup, { PopupComponentProps } from '../src';

const CustomPopupContainer = forwardRef<HTMLDivElement, PopupComponentProps>(
  ({ children, ...props }, ref) => (
    <div
      style={{
        backgroundColor: N700,
        borderRadius: borderRadius(),
        ':focus': {
          outline: 'none',
        },
      }}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  ),
);

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      popupComponent={CustomPopupContainer}
      content={() => (
        <div
          style={{
            width: 175,
            height: 250,
          }}
        />
      )}
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          isSelected={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          iconBefore={<MoreIcon label="More" />}
        />
      )}
    />
  );
};
