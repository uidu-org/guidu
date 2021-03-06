import Button, { ButtonGroup } from '@uidu/button';
import React from 'react';
import { Trash, ZoomIn } from 'react-feather';
import StyledToolbar from './styled';

export default function Toolbar({
  handleScale,
  confirm,
  dismiss,
  isHovered,
  label,
}) {
  return (
    <StyledToolbar
      className="card card-body flex-row shadow-lg"
      isHovered={isHovered}
    >
      {handleScale && (
        <div className="range d-flex align-items-center">
          <ZoomIn />
          <input
            className="custom-range mx-3"
            name="scale"
            type="range"
            onChange={handleScale}
            min="1"
            max="2"
            step="0.01"
            defaultValue="1"
          />
        </div>
      )}
      <div className="d-flex align-items-center ml-auto">
        <ButtonGroup>
          <Button
            onClick={dismiss}
            iconBefore={<Trash size={16} />}
            className={label && 'mr-2'}
          />
          {label && (
            <Button onClick={confirm} appearance="primary">
              {label}
            </Button>
          )}
        </ButtonGroup>
      </div>
    </StyledToolbar>
  );
}
