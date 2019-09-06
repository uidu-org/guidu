import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default class FormHeader extends PureComponent<any> {
  render() {
    const { name, children } = this.props;
    return (
      <Wrapper>
        <h5 className="my-0 mr-2">{name}</h5>
        {children}
      </Wrapper>
    );
  }
}
