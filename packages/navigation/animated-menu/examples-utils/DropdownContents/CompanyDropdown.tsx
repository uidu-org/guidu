import React from 'react';
import styled from 'styled-components';
import { DropdownSection, Heading, HeadingLink, Icon } from './Components';

const CompanyDropdownEl = styled.div`
  width: 18.5rem;
`;

const CompanyDropdown = () => {
  return (
    <CompanyDropdownEl>
      <DropdownSection data-first-dropdown-section>
        <ul tw="flex flex-col">
          <HeadingLink>
            <a href="/">
              <Icon /> About Stripe
            </a>
          </HeadingLink>
          <HeadingLink>
            <a href="/">
              <Icon />
              Customers
            </a>
          </HeadingLink>
          <HeadingLink>
            <a href="/">
              <Icon />
              Jobs
            </a>
          </HeadingLink>
          <HeadingLink noMarginBottom>
            <a href="/">
              <Icon />
              Environment
            </a>
          </HeadingLink>
        </ul>
      </DropdownSection>
      <DropdownSection>
        <div>
          <Heading>
            <Icon />
            From the Blog
          </Heading>
          <ul tw="flex flex-col">
            <li>
              <a href="/">Stripe Atlas &rsaquo;</a>
            </li>
            <li>
              <a href="/">Stripe Home &rsaquo;</a>
            </li>
            <li>
              <a href="/">Improved Fraud Detection &rsaquo;</a>
            </li>
          </ul>
        </div>
      </DropdownSection>
    </CompanyDropdownEl>
  );
};

export default CompanyDropdown;
