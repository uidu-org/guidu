import Button from '@uidu/button';
import { colors } from '@uidu/theme';
import React, { Component, ReactElement, ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'react-feather';
import Flag, { FlagGroup } from '../src';

type State = {
  flags: Array<flagData>;
};

type flagData = {
  created: number;
  description: string;
  icon: ReactNode;
  id: number;
  key: number;
  title: string;
};

const getRandomIcon = () => {
  const icons = iconMap() as { [key: string]: object };
  const iconArray = Object.keys(icons).map(i => icons[i]);
  return iconArray[Math.floor(Math.random() * iconArray.length)];
};

const iconMap = (key?: string, color?: string) => {
  const icons: { [key: string]: ReactElement } = {
    info: <Info color={color || colors.P300} />,
    success: <CheckCircle color={color || colors.G300} />,
    warning: <AlertTriangle color={color || colors.Y300} />,
    error: <AlertCircle color={color || colors.R300} />,
  };

  return key ? icons[key] : icons;
};

const getRandomDescription = () => {
  const descriptions = [
    'Marzipan croissant pie. Jelly beans gingerbread caramels brownie icing.',
    'Fruitcake topping wafer pie candy dragée sesame snaps cake. Cake cake cheesecake. Pie tiramisu carrot cake tart tart dessert cookie.',
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getFlagData = (index: number, timeOffset: number = 0): flagData => {
  return {
    created: Date.now() - timeOffset * 1000,
    description: getRandomDescription(),
    icon: getRandomIcon(),
    id: index,
    key: index,
    title: `${index + 1}: Whoa a new flag!`,
  };
};

export default class FlagGroupExample extends Component<void, State> {
  state = { flags: [] };

  flagCount = 0;

  addFlag = () => {
    const flags = this.state.flags.slice() as flagData[];
    flags.unshift(getFlagData(this.flagCount++));
    this.setState({ flags });
  };

  dismissFlag = () => {
    this.setState(state => ({ flags: state.flags.slice(1) }));
    this.flagCount--;
  };

  render() {
    const actions = [
      {
        content: 'Nice one!',
        onClick: () => {},
      },
      { content: 'Not right now thanks', onClick: this.dismissFlag },
    ];

    return (
      <div>
        <FlagGroup onDismissed={this.dismissFlag}>
          {this.state.flags.map(flag => (
            <Flag actions={actions} {...flag} />
          ))}
        </FlagGroup>
        <Button onClick={this.addFlag}>Add Flag</Button>
      </div>
    );
  }
}
