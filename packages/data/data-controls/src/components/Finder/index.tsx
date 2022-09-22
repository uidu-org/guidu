import InlineDialog from '@uidu/inline-dialog';
import Tooltip from '@uidu/tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'react-feather';
import { Trigger } from '../../styled';
import { FinderProps } from './types';

export default function Finder<T>({ tableInstance }: FinderProps<T>) {
  const node: React.RefObject<HTMLDivElement> = useRef();
  const input: React.RefObject<HTMLInputElement> = useRef();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { setGlobalFilter } = tableInstance;

  const handleClick = (e) => {
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
    <div ref={node} className="">
      <InlineDialog
        content={
          <input
            ref={input}
            className="border-0 shadow-none form-control"
            type="search"
            name=""
            placeholder="Cerca..."
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        }
        placement="bottom-end"
        isOpen={isDialogOpen}
      >
        <Tooltip content={'Search in view'} position="bottom">
          <Trigger
            activeBg="#fee2d5"
            className="mr-2 btn"
            active={false}
            onClick={() => {
              setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen);
              setTimeout(() => input.current.focus(), 200);
            }}
            iconBefore={<Search strokeWidth={2} size={14} />}
          ></Trigger>
        </Tooltip>
      </InlineDialog>
    </div>
  );
}
