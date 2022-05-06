import React from 'react';
import { TouchScrollable } from 'react-scrolllock';
import { useModal } from './hooks';
import ScrollContainer from './internal/components/scroll-container';
import useScroll from './internal/hooks/use-scroll';

export interface ModalBodyProps {
  /**
   * Children of modal dialog footer.
   */
  children: React.ReactNode;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;

  className?: string;
}

function ModalBody(props: ModalBodyProps) {
  const { children, className, testId: userDefinedTestId } = props;
  const { testId: modalTestId } = useModal();
  const shouldScrollInViewport = useScroll();

  const testId = userDefinedTestId || (modalTestId && `${modalTestId}--body`);

  return shouldScrollInViewport ? (
    <div
      tw="flex[1 1 auto] py-0 px-8"
      className={className}
      data-testid={testId}
    >
      {children}
    </div>
  ) : (
    <TouchScrollable>
      <ScrollContainer testId={userDefinedTestId || modalTestId}>
        <div
          tw="flex[1 1 auto] py-1 px-8"
          className={className}
          data-testid={testId}
        >
          {children}
        </div>
      </ScrollContainer>
    </TouchScrollable>
  );
}

export default ModalBody;
