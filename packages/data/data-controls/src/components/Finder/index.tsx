import InlineDialog from '@uidu/inline-dialog';
import Tooltip from '@uidu/tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'react-feather';
import { Trigger } from '../../styled';
import { FinderProps } from './types';

export default function Finder({ onChange }: FinderProps) {
  const node: React.RefObject<HTMLDivElement> = useRef();
  const input: React.RefObject<HTMLInputElement> = useRef();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsDialogOpen(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div ref={node}>
      <InlineDialog
        content={
          <input
            ref={input}
            className="form-control shadow-none border-0"
            type="search"
            name=""
            placeholder="Cerca..."
            onChange={onChange}
          />
        }
        placement="bottom-end"
        isOpen={isDialogOpen}
      >
        <Tooltip content={'Search in view'} position="bottom">
          <Trigger
            activeBg="#fee2d5"
            className="btn mr-n2"
            active={false}
            onClick={() => {
              setIsDialogOpen(!isDialogOpen);
              setTimeout(() => input.current.focus(), 200);
            }}
          >
            <Search strokeWidth={2} size={14} />
          </Trigger>
        </Tooltip>
      </InlineDialog>
    </div>
  );
}
