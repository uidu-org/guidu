import { ShellBody } from '@uidu/shell';
import { colors } from '@uidu/theme';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Cards from './Cards';

const Title = styled.h1`
  font-size: 52px;
  letter-spacing: 0;
`;
const Intro = styled.div`
  display: inline-block;
  font-size: 24px;
  font-weight: 300;
  max-width: 640px;
  letter-spacing: 0;

  a {
    color: ${colors.B75};

    &:hover {
      color: ${colors.N0};
    }
  }
`;

export default class HomePage extends React.Component {
  render() {
    return (
      <ShellBody scrollable>
        <Helmet>
          <title>{`${BASE_TITLE}`}</title>
        </Helmet>
        <div className="jumbotron rounded-0">
          <Title>Guidu</Title>
          <Intro>
            Uidu&#39;s official UI library, built according to the
            uidu&nbsp;Design&nbsp;Guidelines.
          </Intro>
        </div>
        <Cards />
      </ShellBody>
    );
  }
}
