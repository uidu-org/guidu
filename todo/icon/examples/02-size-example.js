// @flow
import React, { Component, type Element } from 'react';
import styled from 'styled-components';
import Btn, { ButtonGroup } from '@atlaskit/button';

import ActivityIcon from '../glyph/activity';
import AddCircleIcon from '../glyph/add-circle';
import AddItemIcon from '../glyph/add-item';
import AddIcon from '../glyph/add';
import AddonIcon from '../glyph/addon';
import AppSwitcherIcon from '../glyph/menu';
import ArrowDownIcon from '../glyph/arrow-down';
import ArrowLeftCircleIcon from '../glyph/arrow-left-circle';
import ArrowLeftIcon from '../glyph/arrow-left';
import ArrowRightIcon from '../glyph/arrow-right';
import ArrowUpIcon from '../glyph/arrow-up';

const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 8px;
  min-height: 60px;
`;

const IconWrapper = styled.span`
  margin: 4px;
`;

const demoIcons = [
  ActivityIcon,
  AddCircleIcon,
  AddItemIcon,
  AddIcon,
  AddonIcon,
  AppSwitcherIcon,
  ArrowDownIcon,
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
];

const Button = props => (
  <div style={{ marginRight: 4 }}>
    <Btn {...props} />
  </div>
);

const sizes = ['small', 'medium', 'large', 'xlarge'];

type sizeOpts = 'small' | 'medium' | 'large' | 'xlarge';

class IconSizeExample extends Component<{}, { size: sizeOpts }> {
  state = {
    size: 'medium',
  };

  updateSize = (s: sizeOpts) => this.setState({ size: s });

  renderButtons = (): Array<Element<typeof Button>> =>
    sizes.map(s => (
      <Button
        isSelected={s === this.state.size}
        key={s}
        onClick={() => this.updateSize(s)}
      >
        {s}
      </Button>
    ));

  render() {
    return (
      <div>
        <ButtonGroup>{this.renderButtons()}</ButtonGroup>
        <IconRow>
          {demoIcons.map((Icon, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <IconWrapper key={i}>
              <Icon label={`Icon ${i}`} size={this.state.size} />
            </IconWrapper>
          ))}
        </IconRow>
      </div>
    );
  }
}

export default IconSizeExample;
