import { SortOrder } from '@uidu/editor-common';
import Tooltip from '@uidu/tooltip';
import * as React from 'react';
import styled from 'styled-components';

export enum StatusClassNames {
  ASC = 'sorting-icon-svg__asc',
  DESC = 'sorting-icon-svg__desc',
  SORTING_NOT_ALLOWED = 'sorting-icon-svg__not-allowed',
}

const Wrapper = styled.figure`
  border: 2px solid #fff;
  background-color: #f4f5f7;
  align-items: center;
  display: flex;
  height: 23px;
  justify-content: center;
  margin: 8px;
  padding: 8px;
  position: absolute;
  right: 0;
  top: 0;

  &.${StatusClassNames.SORTING_NOT_ALLOWED} {
    cursor: not-allowed;
  }

  svg {
    transition: transform 0.3s cubic-bezier(0.15, 1, 0.3, 1);
    transform-origin: 50% 50%;
  }

  svg.${StatusClassNames.DESC} {
    transform: rotate(-180deg);
  }
`;

const getClassName = (status?: SortOrder) => {
  switch (status) {
    case SortOrder.ASC:
      return StatusClassNames.ASC;
    case SortOrder.DESC:
      return StatusClassNames.DESC;
  }

  return '';
};

type Props = {
  isSortingAllowed: boolean;
  sortOrdered?: SortOrder;
};

const getTooltipTitle = (status?: SortOrder): string => {
  switch (status) {
    case SortOrder.NO_ORDER:
      return 'Sort column A → Z';
    case SortOrder.ASC:
      return 'Sort column A → Z';
    case SortOrder.DESC:
      return 'Sort column Z → A';
  }

  return '';
};

const notAllowedTooltip = `⚠️  You can't sort a table with merged cell`;

const SortingIcon = ({ isSortingAllowed, sortOrdered }: Props) => {
  const activated = sortOrdered !== SortOrder.NO_ORDER;
  const wrapperClassName = !isSortingAllowed
    ? StatusClassNames.SORTING_NOT_ALLOWED
    : '';
  const content = isSortingAllowed
    ? getTooltipTitle(sortOrdered)
    : notAllowedTooltip;

  return (
    <Tooltip delay={0} content={content} position="top">
      <Wrapper className={wrapperClassName}>
        <svg
          width={8}
          height={12}
          className={getClassName(sortOrdered)}
          fillOpacity={activated ? 1 : 0.5}
        >
          <g fill="none" fillRule="evenodd">
            <path d="M-8-6h24v24H-8z" />
            <path
              d="M3 8.509V1c0-.552.449-1 1-1 .552 0 1 .448 1 1V8.51l1.217-1.206a1.05 1.05 0 011.477 0 1.03 1.03 0 01.004 1.463l-.003.002-2.956 2.93a1.053 1.053 0 01-1.478 0L.305 8.767a1.03 1.03 0 01.001-1.464 1.05 1.05 0 011.477 0L3 8.508z"
              fill="#42526E"
            />
          </g>
        </svg>
      </Wrapper>
    </Tooltip>
  );
};

export default SortingIcon;
