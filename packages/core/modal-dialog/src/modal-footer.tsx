import React, { ReactNode } from 'react';
import { useModal } from './hooks';

export interface ModalFooterProps {
  /**
   * Children of modal dialog footer.
   */
  children?: ReactNode;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;

  className?: string;
}

function ModalFooter(props: ModalFooterProps) {
  const { children, className, testId: userDefinedTestId } = props;
  const { testId: modalTestId } = useModal();

  const testId = userDefinedTestId || (modalTestId && `${modalTestId}--footer`);

  return (
    <div
      tw="flex relative items-center justify-end px-8 py-6"
      className={className}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export default ModalFooter;
