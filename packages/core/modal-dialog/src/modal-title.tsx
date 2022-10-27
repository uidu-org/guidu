import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useModal } from './hooks';
import { iconColor } from './internal/constants';
import { Appearance } from './types';

const IconWrapper = styled.span<{ isMultiline: boolean }>`
  ${tw`flex[0 0 auto] flex items-center mr-4`}
  ${({ isMultiline }) => {
    if (isMultiline) {
      return tw`mr-2`;
    }
    return tw`mr-4`;
  }}
`;

function TitleIcon({
  appearance,
  isMultiline,
}: Required<Pick<ModalTitleProps, 'appearance' | 'isMultiline'>>) {
  const Icon = appearance === 'danger' ? ErrorIcon : WarningIcon;

  return (
    <IconWrapper isMultiline={isMultiline}>
      <Icon label={`${appearance} icon`} primaryColor={iconColor[appearance]} />
    </IconWrapper>
  );
}

export interface ModalTitleProps {
  /**
   * Appearance of the modal that changes the color of the primary action and adds an icon to the title.
   */
  appearance?: Appearance;

  /**
   * Children of modal dialog header.
   */
  children?: ReactNode;

  /**
   * When `true` will allow the title to span multiple lines.
   * Defaults to `true`.
   */
  isMultiline?: boolean;

  /**
   * Apply classnames to the title.
   */
  className?: string;

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;
}

function ModalTitle(props: ModalTitleProps) {
  const {
    appearance,
    children,
    isMultiline = true,
    testId: userDefinedTestId,
    className,
  } = props;
  const { titleId, testId: modalTestId } = useModal();

  const testId = userDefinedTestId || (modalTestId && `${modalTestId}--title`);

  return (
    <h1
      tw="flex min-w-0 m-0 items-center text-2xl font-medium"
      data-testid={testId}
      className={className}
    >
      {appearance && (
        <TitleIcon appearance={appearance} isMultiline={isMultiline} />
      )}
      <span
        id={titleId}
        tw=""
        css={[
          tw`min-w-0 flex[1 1 auto] word-wrap[break-word]`,
          !isMultiline && tw`truncate`,
        ]}
        data-testid={testId && `${testId}-text`}
      >
        {children}
      </span>
    </h1>
  );
}

export default ModalTitle;
