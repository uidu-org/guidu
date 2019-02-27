// @flow
import React, { Component } from 'react';
import Button from '@uidu/button';
import { ArrowUp, ArrowDown } from 'react-feather';
import { Label } from '@uidu/field-base';
import { ToggleStateless } from '@uidu/toggle';
import { AVATAR_SIZES } from '@uidu/avatar';
import { Note, Code } from '../examples-util/helpers';
import AvatarGroup from '../src';
import { avatarUrl } from '../examples-util/data';

type State = {|
  avatarCountMax: number,
  gridWidth: number,
  mode: 'stack' | 'grid',
  sizeIndex: number,
  tooltipsEnabled: boolean,
  avatars: array,
|};

export default class AvatarGroupExample extends Component<*, State> {
  state: State = {
    avatarCountMax: 11,
    gridWidth: 220,
    mode: 'stack',
    sizeIndex: 3,
    tooltipsEnabled: true,
    avatars: [],
  };

  decrement = (key: string) =>
    this.setState(state => ({ [key]: state[key] - 1 }));

  increment = (key: string) =>
    this.setState(state => ({ [key]: state[key] + 1 }));

  toggleTooltips = () => {
    this.setState({
      tooltipsEnabled: !this.state.tooltipsEnabled,
    });
  };

  addAvatar = () => {
    const { sizeIndex, avatars } = this.state;
    this.setState({
      avatars: [...avatars, 1],
    });
  };

  render() {
    const { avatarCountMax, gridWidth, mode, sizeIndex, avatars } = this.state;
    const sizes = Object.keys(AVATAR_SIZES);
    const avatarSize = sizes[sizeIndex];

    return (
      <div>
        <Note size="large">
          Click the excess indicator to see the remaining avatars in a dropdown
          menu.
        </Note>
        <div style={{ display: 'flex', marginTop: '1em' }}>
          <div style={{ flex: 1 }}>
            <h5 style={{ marginBottom: '0.5em' }}>Avatar Size: {avatarSize}</h5>
            <div>
              <Button
                isDisabled={avatarSize === 'small'}
                onClick={() => this.decrement('sizeIndex')}
                iconBefore={<ArrowDown size="small" label="Smaller" />}
              >
                Smaller
              </Button>
              <Button
                isDisabled={avatarSize === 'xlarge'}
                onClick={() => this.increment('sizeIndex')}
                iconBefore={<ArrowUp size="small" label="Larger" />}
              >
                Larger
              </Button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ marginBottom: '0.5em' }}>
              Avatar Count: {avatars.length}
            </h5>
            <div>
              <Button
                isDisabled={avatars.length <= 1}
                // onClick={() => this.remove()}
                iconBefore={<ArrowDown size="small" label="Less" />}
              >
                Less
              </Button>
              <Button
                isDisabled={avatars.length >= 30}
                onClick={() => this.addAvatar()}
                iconBefore={<ArrowUp size="small" label="More" />}
              >
                More
              </Button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ marginBottom: '0.5em' }}>
              Grid Max: {avatarCountMax}
            </h5>
            <div>
              <Button
                isDisabled={avatarCountMax <= 1}
                onClick={() => this.decrement('avatarCountMax')}
                iconBefore={<ArrowDown size="small" label="Less" />}
              >
                Less
              </Button>
              <Button
                isDisabled={avatarCountMax >= 30}
                onClick={() => this.increment('avatarCountMax')}
                iconBefore={<ArrowUp size="small" label="More" />}
              >
                More
              </Button>
            </div>
          </div>
        </div>
        <h5>Grid</h5>
        <Note>
          Total {avatars.length} / Max {avatarCountMax}
        </Note>
        <input
          min="200"
          max="500"
          onChange={e =>
            this.setState({ gridWidth: parseInt(e.target.value, 10) })
          }
          step="10"
          title="Grid Width"
          type="range"
          value={gridWidth}
        />
        <div style={{ maxWidth: gridWidth, position: 'relative' }}>
          <AvatarGroup
            appearance="grid"
            onAvatarClick={console.log}
            data={avatars.map(i => ({
              key: i,
              appearance: 'circle',
              enableTooltip: true,
              href: '#',
              name: `Grid Avatar ${i + 1}`,
              src: avatarUrl,
              size: avatarSize,
            }))}
            maxCount={avatarCountMax}
            size={avatarSize}
          />
          <span
            style={{
              borderLeft: '1px solid #ccc',
              paddingLeft: '1em',
              fontSize: 11,
              position: 'absolute',
              right: 0,
              top: 0,
              color: '#999',
              transform: 'translateX(100%)',
            }}
          >
            {gridWidth}px
          </span>
        </div>
        <h5>Stack</h5>
        <Note>Total {avatars.length} / Max 5</Note>
        <AvatarGroup
          onAvatarClick={console.log}
          data={avatars.map(i => ({
            key: i,
            href: '#',
            name: `Stack Avatar ${i + 1}`,
            src: avatarUrl,
            size: avatarSize,
            appearance: 'circle',
            enableTooltip: true,
          }))}
          size={avatarSize}
        />

        <h5>On {'"More"'} Click</h5>
        <div style={{ maxWidth: 380 }}>
          <Note>
            Circumvent the default dropdown menu behaviour by passing{' '}
            <Code>onMoreClick</Code> to <Code>{'<AvatarGroup />'}</Code> and
            handle the event however you want.
          </Note>
          <AvatarGroup
            onMoreClick={() => this.setState({ mode: 'grid' })}
            appearance={mode}
            maxCount={mode === 'grid' ? avatars.length : 0}
            data={avatars.map(i => ({
              key: i,
              href: '#',
              name: `Stack Avatar ${i + 1}`,
              src: avatarUrl,
              size: avatarSize,
              appearance: 'circle',
              enableTooltip: true,
            }))}
            size={avatarSize}
          />
          {mode === 'grid' ? (
            <button onClick={() => this.setState({ mode: 'stack' })}>
              reset
            </button>
          ) : null}
        </div>

        <h5>Removed from tab order</h5>
        <div style={{ maxWidth: 380 }}>
          <Note>
            Prevent tabbing to elements in the avatar group by passing{' '}
            <Code>tabIndex</Code> via the <Code>showMoreButtonProps</Code> and{' '}
            <Code>data</Code> props.
          </Note>
          <AvatarGroup
            appearance="stack"
            maxCount={5}
            data={avatars.map(i => ({
              appearance: 'circle',
              enableTooltip: true,
              href: '#',
              key: i,
              name: `Stack Avatar ${i + 1}`,
              size: avatarSize,
              src: avatarUrl,
              tabIndex: -1,
            }))}
            size={avatarSize}
            showMoreButtonProps={{ tabIndex: -1 }}
          />
        </div>

        <h5>Constrained by the scroll parent</h5>
        <div>
          <p>Expand and scroll up to reposition the avatar group menu</p>
          <div
            style={{
              border: '1px solid black',
              height: '200px',
              width: '300px',
              overflow: 'scroll',
            }}
          >
            <div
              style={{ width: '300px', height: '600px', paddingTop: '200px' }}
            >
              <AvatarGroup
                boundariesElement="scrollParent"
                onAvatarClick={console.log}
                data={avatars.slice(0, 6).map(i => ({
                  href: '#',
                  key: i,
                  name: `Stack Avatar ${i + 1}`,
                  src: avatarUrl,
                  size: avatarSize,
                  appearance: 'circle',
                  enableTooltip: true,
                }))}
              />
            </div>
          </div>
        </div>

        <h5>Non-interactive</h5>
        <div>
          <Label label="Enable tooltips" />
          <ToggleStateless
            isChecked={this.state.tooltipsEnabled}
            onChange={this.toggleTooltips}
          />
          <AvatarGroup
            data={avatars.map(i => ({
              href: '#',
              key: i,
              name: `Stack Avatar ${i + 1}`,
              src: avatarUrl,
              size: avatarSize,
              appearance: 'circle',
              enableTooltip: this.state.tooltipsEnabled,
            }))}
            size={avatarSize}
          />
        </div>
      </div>
    );
  }
}
