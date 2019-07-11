import { colors, gridSize, math } from '@uidu/theme';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Cards from './Cards';
import { TABLET_BREAKPOINT_MIN } from './config';

const Title = styled.h1`
  font-size: 52px;
  margin: 80px 0 0 !important;
  letter-spacing: 0;
`;
const Intro = styled.div`
  display: inline-block;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 80px;
  margin-top: 24px;
  max-width: 640px;
  letter-spacing: 0;

  a {
    color: ${colors.B75};

    &:hover {
      color: ${colors.N0};
    }
  }
`;

const HomePageWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-top: ${math.add(gridSize, 3)}px;

  @media (min-width: ${TABLET_BREAKPOINT_MIN}px) {
    margin-top: ${math.add(gridSize, 10)}px;
  }

  @media (min-width: 800px) {
    margin-right: 64px;
  }
`;

export default class HomePage extends React.Component {
  render() {
    return (
      <HomePageWrapper>
        <Helmet>
          <title>{`${BASE_TITLE}`}</title>
        </Helmet>
        <Title>Guidu</Title>
        <Intro>
          Uidu&#39;s official UI library, built according to the
          uidu&nbsp;Design&nbsp;Guidelines.
        </Intro>
        <Cards />
      </HomePageWrapper>
    );
  }
}
