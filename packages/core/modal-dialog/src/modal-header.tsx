import React from 'react';
import { useModal } from './hooks';

export interface ModalHeaderProps {
  /**
   * Children of modal dialog header.
   */
  children?: React.ReactNode;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;

  className?: string;
}

function ModalHeader(props: ModalHeaderProps) {
  const { children, className, testId: userDefinedTestId } = props;
  const { testId: modalTestId } = useModal();

  const testId = userDefinedTestId || (modalTestId && `${modalTestId}--header`);

  return (
    <div
      tw="flex relative items-center justify-between px-8 py-6"
      className={className}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export default ModalHeader;
