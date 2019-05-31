import Avatar from '@uidu/avatar';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #eeeeee;
  border-radius: 40px;
  padding-right: 8px;
  line-height: 1;
`;

export default class MemberRenderer extends PureComponent<any> {
  render() {
    const { value } = this.props;
    return (
      <Wrapper>
        <Avatar size="small" enableTooltip={false} borderColor="transparent" />
        <span className="ml-1">{value}</span>
      </Wrapper>
    );
  }
}
