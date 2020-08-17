import React from 'react';
import styled from 'styled-components';
import { Icon, DropdownSection, Heading, HeadingLink } from './Components';

const DevelopersDropdownEl = styled.div`
  width: 25rem;
`;

const Flex = styled.div`
  display: flex;
  > div:first-of-type {
    margin-right: 48px;
  }
`;

const DevelopersDropdown = () => {
  return (
    <DevelopersDropdownEl>
      <DropdownSection data-first-dropdown-section>
        <div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item list-group-item-action">
              <Heading>Documentation</Heading>
              <p className="mb-0">
                Start integrating Stripe&rsquo;s products and tools
              </p>
              <Flex className="mt-3">
                <div>
                  <h6>Get Started</h6>
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link px-0 py-2" href="/">
                        Elements
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link px-0 py-2" href="/">
                        Checkout
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link px-0 py-2" href="/">
                        Mobile apps
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h6>Popular Topics</h6>
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link px-0 py-2" href="/">
                        Apple Pay
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link px-0 py-2" href="/">
                        Testing
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link px-0 py-2" href="/">
                        Launch Checklist
                      </a>
                    </li>
                  </ul>
                </div>
              </Flex>
            </li>
          </ul>
        </div>
      </DropdownSection>
      <DropdownSection>
        <ul className="nav flex-column">
          <HeadingLink>
            <a href="/">
              <Icon /> Full API Reference
            </a>
          </HeadingLink>
          <HeadingLink>
            <a href="/">
              <Icon /> API Status
            </a>
          </HeadingLink>
          <HeadingLink noMarginBottom>
            <a href="/">
              <Icon /> Open Source
            </a>
          </HeadingLink>
        </ul>
      </DropdownSection>
    </DevelopersDropdownEl>
  );
};

export default DevelopersDropdown;
