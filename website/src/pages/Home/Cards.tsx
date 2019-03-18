import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from '../../components/WrappedLink';
import { gridSize, colors, math } from '@atlaskit/theme';
import debounce from 'lodash.debounce';

import { AtlassianIcon } from '@atlaskit/logo';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import BlogIcon from '@atlaskit/icon/glyph/component';
import MediaDocIcon from '@atlaskit/icon/glyph/media-services/document';
import CodeIcon from '@atlaskit/icon/glyph/code';

import rocket from '../../assets/Rocket.png';
import platform from '../../assets/Platform.png';
import multiTool from '../../assets/multiTool.png';

import {
  MOBILE_BREAKPOINT_MAX,
  TABLET_BREAKPOINT_MIN,
  TABLET_BREAKPOINT_MAX,
} from './config';

const CardIcon = styled.span`
  align-items: center;
  background-color: ${p => p.color};
  border-radius: 4px;
  border: 2px solid ${colors.N0};
  display: flex;
  height: 24px;
  justify-content: center;
  margin-right: 8px;
  width: 24px;
`;

const cardVerticalAnimationDistance = math.multiply(gridSize, 7.5);

const loadInAnimation = keyframes`
  0% {
    top: ${cardVerticalAnimationDistance}px;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 0;
    opacity: 1;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  max-width: 980px;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
    margin-top: 0;
  }
`;

export const CardColumn = styled.div`
  flex: 0 0 0;
`;

const BaseCardStyles = css`
  display: inline-block;
  width: 300px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: ${colors.N0};
  margin: ${gridSize}px;
  background-repeat: no-repeat;
  opacity: 0;
  top: ${cardVerticalAnimationDistance}px;
  color: ${colors.N900};
  animation: ${loadInAnimation} 0.6s cubic-bezier(0.15, 1, 0.33, 1) forwards;
  box-sizing: border-box;
  text-align: left;

  z-index: 100;
  box-shadow: 0 1px 1px rgba(23, 43, 77, 0.2),
    0 0 0.5px 0 rgba(23, 43, 77, 0.25);
  transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);

  @media (max-width: ${TABLET_BREAKPOINT_MIN}px) {
    display: block;
    margin: ${math.multiply(gridSize, 3)}px ${gridSize}px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px -2px rgba(23, 43, 77, 0.32),
      0 0 1px rgba(23, 43, 77, 0.25);
    text-decoration: none;
    color: ${colors.N900};
  }

  animation-delay: ${({ index }: { index?: number }) =>
    0.5 + 0.03 * (index || 0)}s;
  background-size: contain;
  background-position: bottom;
`;

const InternalCard = styled(Link)`
  ${BaseCardStyles};
`;

const ExternalCard = styled('a')`
  ${BaseCardStyles};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const Img = ({ src, alt = '' }: { src: string; alt?: string }) => (
  <img
    alt={alt}
    style={{
      margin: '0 auto 10px auto',
      height: '200px',
      display: 'block',
    }}
    src={src}
  />
);

export type CardProps = {
  icon: React.ComponentType;
  index?: number;
  text: string;
  title: string;
  image?: string;
  alt?: string;
  to?: string;
  href?: string;
};

class Card extends React.Component<CardProps> {
  render() {
    const { icon: Icon, text, title, image, alt, ...props } = this.props;

    const LinkComponent = props.href ? ExternalCard : InternalCard;

    return (
      <LinkComponent {...props}>
        <div style={{ padding: '16px 24px', marginBottom: 'auto' }}>
          <TitleRow>
            <Icon />
            {title}
          </TitleRow>
          {text ? <p>{text}</p> : null}
        </div>
        {image ? <Img src={image} alt={alt} /> : null}
      </LinkComponent>
    );
  }
}

const cards = [
  {
    to: '/docs/getting-started',
    icon: () => (
      <CardIcon color={colors.R400}>
        <MediaDocIcon
          label="Get started with Atlaskit!"
          primaryColor={colors.N0}
          secondaryColor={colors.R400}
          size="small"
        />
      </CardIcon>
    ),
    image: rocket,
    title: 'Get started with Atlaskit!',
    text: 'Everything you need to get up and running.',
  },
  {
    to: '/packages',
    title: 'Components and APIs',
    image: platform,
    icon: () => (
      <CardIcon color={colors.Y400}>
        <PackagesIcon
          label="Components and APIs"
          primaryColor={colors.N0}
          secondaryColor={colors.Y400}
          size="small"
        />
      </CardIcon>
    ),
    text:
      'Check out the documentation and usage guides for the Atlaskit packages.',
  },
  {
    href: 'http://atlassian.design',
    title: 'Atlassian Design Guidelines',
    image: multiTool,
    icon: () => (
      <CardIcon color={colors.B400}>
        <AtlassianIcon
          label="Atlassian Design Guidelines"
          iconColor={colors.N0}
          iconGradientStart={colors.B400}
          iconGradientStop={colors.N0}
          size="xsmall"
        />
      </CardIcon>
    ),
    text: 'Need some more design guidance? Have a look at the ADG.',
  },
  {
    to: '/docs/guides/contributing',
    title: 'Make it better',
    icon: () => (
      <CardIcon color={colors.R400}>
        <MediaDocIcon
          label="Make it better"
          primaryColor={colors.N0}
          secondaryColor={colors.R400}
          size="small"
        />
      </CardIcon>
    ),
    text:
      'Learn how to contribute code, report issues, and review our code of conduct.',
  },
  {
    href: 'https://bitbucket.org/atlassian/atlaskit-mk-2',
    title: 'Atlaskit Repository',
    icon: () => (
      <CardIcon color={colors.Y400}>
        <CodeIcon
          label="Atlaskit Repository"
          primaryColor={colors.N0}
          secondaryColor={colors.Y400}
          size="small"
        />
      </CardIcon>
    ),
    text:
      'Want to dive straight into the code? Check out our repo on Bitbucket.',
  },
  {
    href: 'https://developer.atlassian.com/blog/',
    title: 'Atlassian Developer Blog',
    icon: () => (
      <CardIcon color={colors.N0}>
        <BlogIcon
          label="Atlassian Developer Blog"
          primaryColor={colors.P400}
          size="medium"
        />
      </CardIcon>
    ),
    text: 'Keep up to date on the latest in engineering at Atlassian.',
  },
];

/* eslint-disable react/no-multi-comp */
export default class Cards extends React.Component {
  state = {
    columnCount: 3,
  };
  debouncedDetect: () => void;

  componentDidMount() {
    this.debouncedDetect = debounce(this.detectColumns, 500);
    window.addEventListener('resize', this.debouncedDetect);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedDetect);
  }

  detectColumns = () => {
    const width = window.innerWidth;
    if (width <= MOBILE_BREAKPOINT_MAX) {
      this.setState({ columnCount: 1 });
    } else if (width <= TABLET_BREAKPOINT_MAX) {
      this.setState({ columnCount: 2 });
    } else {
      this.setState({ columnCount: 3 });
    }
  };

  columnIndexes = () => {
    const { columnCount } = this.state;
    if (columnCount === 1) {
      return [[0, 1, 2, 3, 4, 5]];
    } else if (columnCount === 2) {
      return [[0, 2], [1, 3, 4, 5]];
    }
    return [[0, 3], [1, 4], [2, 5]];
  };

  render() {
    const columns = this.columnIndexes();

    return (
      <CardsWrapper innerRef={this.detectColumns}>
        {columns.map((cardKeys, colIndex) => (
          /* eslint-disable react/no-array-index-key */
          <CardColumn key={colIndex}>
            {cardKeys.map((cardIndex, index) => {
              const props = cards[cardIndex];
              return <Card index={index} key={props.title} {...props} />;
            })}
          </CardColumn>
        ))}
      </CardsWrapper>
    );
  }
}
