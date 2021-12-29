import React, { forwardRef, Ref } from 'react';
import HeadingItem from '../item/heading-item';
import { SectionBaseProps, SectionProps } from '../types';
import { StyledSection } from './styled';

const Section = forwardRef<HTMLElement, SectionProps>(
  // Type needed on props to extract types with extract react types.
  ({ children, overrides, title, testId, ...rest }: SectionProps, ref) => {
    return title !== undefined ? (
      <SectionBase {...rest} testId={testId} ref={ref} aria-label={title}>
        <HeadingItem testId={testId && `${testId}--heading`} aria-hidden>
          {title}
        </HeadingItem>
        {children}
      </SectionBase>
    ) : (
      <SectionBase {...rest} ref={ref}>
        {children}
      </SectionBase>
    );
  },
);

export const SectionBase = forwardRef<HTMLElement, SectionBaseProps>(
  // Type needed on props to extract types with extract react types.
  ({ isScrollable, hasSeparator, testId, ...rest }: SectionBaseProps, ref) => (
    <StyledSection
      isScrollable={isScrollable}
      hasSeparator={hasSeparator}
      data-testid={testId}
      role="group"
      // this is being used to target CSS selectors
      // where emotion's API was falling a little short.
      data-section
      {...rest}
      ref={ref as Ref<HTMLDivElement>}
    />
  ),
);

export default Section;
