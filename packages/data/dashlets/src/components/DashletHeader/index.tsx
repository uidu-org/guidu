import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { DashletHeaderProps } from './types';

const HeaderWrapper = styled.div`
  ${tw`background[rgb(var(--body-on-primary-bg))] px-4 py-5 sm:px-6`}
`;
const HeaderInnerWrapper = styled.div`
  ${tw`-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap`}
`;
const HeaderLabelWrapper = styled.div`
  ${tw`ml-4 mt-4`}
`;
const HeaderLabelName = styled.h3`
  ${tw`text-base font-medium text-gray-900`}
`;
const HeaderLabelDescription = styled.p`
  ${tw`text-base text-gray-500`}
`;
const HeaderChildrenWrapper = styled.div`
  ${tw`ml-4 mt-4 flex-shrink-0`}
`;

export default function DashletHeader(props: DashletHeaderProps) {
  const { name, description, isCard, children } = props;

  return (
    <HeaderWrapper>
      <HeaderInnerWrapper>
        <HeaderLabelWrapper>
          <HeaderLabelName>{name}</HeaderLabelName>
          {description ? (
            <HeaderLabelDescription>{description}</HeaderLabelDescription>
          ) : null}
        </HeaderLabelWrapper>
        <HeaderChildrenWrapper>
          {children}
          {/* <button
            type="button"
            tw="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create new job
          </button> */}
        </HeaderChildrenWrapper>
      </HeaderInnerWrapper>
    </HeaderWrapper>
  );
}
