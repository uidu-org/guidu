// @flow
import React, { Component, type Element } from 'react';
import styled from 'styled-components';
import Btn, { ButtonGroup } from '@atlaskit/button';

import PriorityTrivial from '../glyph/priority-trivial';
import PriorityLowest from '../glyph/priority-lowest';
import PriorityLow from '../glyph/priority-low';
import PriorityMinor from '../glyph/priority-minor';
import PriorityMidium from '../glyph/priority-medium';
import PriorityMajor from '../glyph/priority-major';
import PriorityCritical from '../glyph/priority-critical';
import PriorityBlocker from '../glyph/priority-blocker';

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
  PriorityTrivial,
  PriorityLowest,
  PriorityLow,
  PriorityMinor,
  PriorityMidium,
  PriorityMajor,
  PriorityCritical,
  PriorityBlocker,
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
