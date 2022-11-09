import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { DashletHeaderProps } from './types';

const HeaderWrapper = styled.div`
  ${tw`px-4 py-5 border-b border-opacity-50 sm:px-6`}
`;
const HeaderInnerWrapper = styled.div`
  ${tw`flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap`}
`;
const HeaderLabelWrapper = styled.div`
  ${tw`mt-4 ml-4`}
`;
const HeaderLabelName = styled.h3`
  ${tw`text-base font-medium [color:rgb(var(--body-primary-color))]`}
`;
const HeaderLabelDescription = styled.p`
  ${tw`mt-1 text-sm [color:rgb(var(--body-secondary-color))]`}
`;
const HeaderChildrenWrapper = styled.div`
  ${tw`flex-shrink-0 mt-4 ml-4`}
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
