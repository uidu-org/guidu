import { usePlatformLeafEventHandler } from '@uidu/analytics';
import React, { forwardRef, memo, MouseEvent, useCallback } from 'react';
import styled from 'styled-components';
import tw, { theme } from 'twin.macro';
import type { BlanketProps } from './types';

const Div = styled.div<{
  isStacked: boolean;
  paddingRight: number;
  isTinted: boolean;
  shouldAllowClickThrough: boolean;
}>`
  ${tw`fixed top-0 bottom-0 left-0 transition-opacity duration-200 [background:rgba(var(--blanket-bg, var(--body-primary-color)), var(--blanket-opacity, 0.35))]`}
  ${({ isTinted }) => (isTinted ? tw`opacity-100` : tw`opacity-0`)}
  ${({ shouldAllowClickThrough }) =>
    shouldAllowClickThrough ? tw`pointer-events-none` : tw`pointer-events-auto`}
  right: ${({ paddingRight }) => `${paddingRight}px`};
  z-index: ${({ isStacked }) =>
    isStacked ? `calc(${theme`zIndex.blanket`} + 1)` : theme`zIndex.blanket`};
`;

const packageName = process.env._PACKAGE_NAME_ as string;
const packageVersion = process.env._PACKAGE_VERSION_ as string;

const analyticsAttributes = {
  componentName: 'blanket',
  packageName,
  packageVersion,
};

function StatelessBlanket(
  {
    shouldAllowClickThrough = false,
    isTinted = false,
    onBlanketClicked = () => {},
    isStacked = false,
    paddingRight = 0,
    className = null,
    children,
    analyticsContext,
  }: BlanketProps,
  ref,
) {
  const onBlanketClickedWithAnalytics = usePlatformLeafEventHandler({
    fn: onBlanketClicked,
    action: 'clicked',
    analyticsData: analyticsContext,
    ...analyticsAttributes,
  });

  const blanketClickOutsideChildren = useCallback(
    (e: MouseEvent<HTMLDivElement>) =>
      e.currentTarget === e.target
        ? onBlanketClickedWithAnalytics(e)
        : undefined,
    [onBlanketClickedWithAnalytics],
  );

  const onClick = shouldAllowClickThrough
    ? undefined
    : blanketClickOutsideChildren;

  const containerProps = {
    shouldAllowClickThrough,
    isTinted,
    onClick,
    isStacked,
    paddingRight,
    className,
    children,
  };

  return (
    <Div role="presentation" onClick={onClick} ref={ref} {...containerProps} />
  );
}

const Blanket = memo(
  forwardRef<HTMLDivElement, BlanketProps>(StatelessBlanket),
);

Blanket.displayName = 'Blanket';

export default Blanket;
