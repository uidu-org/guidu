import React from 'react';
import styled from 'styled-components';
import { DropdownSection, Heading } from './Components';

const ProductsDropdownEl = styled.div`
  width: 30rem;
`;

const Logo = styled.div`
  width: 38px;
  height: 38px;
  margin-right: 16px;
  border-radius: 100%;
  opacity: 0.6;
  background-color: ${({ color }) => `var(--${color})`};
`;

const ProductsDropdown = () => {
  return (
    <ProductsDropdownEl>
      <DropdownSection data-first-dropdown-section>
        <ul className="list-group list-group-flush">
          <li className="list-group-item list-group-item-action d-flex align-items-center">
            <Logo color="blue" />
            <div>
              <Heading color="blue">Payments</Heading>
              <p className="mb-0">A complete payments platform</p>
            </div>
          </li>
          <li className="list-group-item list-group-item-action d-flex align-items-center">
            <Logo color="green" />
            <div>
              <Heading color="green">Billing</Heading>
              <p className="mb-0">
                Build and scale your recurring business model
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-action d-flex align-items-center">
            <Logo color="teal" />
            <div>
              <Heading color="teal">Connect</Heading>
              <p className="mb-0">
                Everything platforms need to get sellers paid
              </p>
            </div>
          </li>
        </ul>
      </DropdownSection>
      <DropdownSection>
        <ul className="list-group list-group-flush">
          <li className="list-group-item list-group-item-action d-flex align-items-center bg-light">
            <Heading className="mb-0 mr-3">Sigma</Heading>
            <div>Your business data at your fingertips.</div>
          </li>
          <li className="list-group-item list-group-item-action d-flex align-items-center bg-light">
            <Heading className="mb-0 mr-3">Atlas</Heading>
            <div>The best way to start an internet business.</div>
          </li>
          <li className="list-group-item list-group-item-action d-flex align-items-center bg-light">
            <Heading className="mb-0 mr-3">Radar</Heading>
            <div>Fight fraud with machine learning.</div>
          </li>
        </ul>
      </DropdownSection>
    </ProductsDropdownEl>
  );
};

export default ProductsDropdown;
