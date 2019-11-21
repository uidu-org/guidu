import { colors, gridSize } from '@uidu/theme';
import React, { CSSProperties, ReactElement } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'react-feather';
import Flag from '../src';
import { AppearanceTypes } from '../src/types';

const actions = [
  { content: 'Understood', onClick: () => {} },
  { content: 'No Way!', onClick: () => {} },
];
const appearances: { [key: string]: { description: string; title: string } } = {
  error: {
    description: 'You need to take action, something has gone terribly wrong!',
    title: 'Uh oh!',
  },
  info: {
    description:
      "This alert needs your attention, but it's not super important.",
    title: 'Hey, did you know...',
  },
  success: {
    description: 'Nothing to worry about, everything is going great!',
    title: 'Good news, everyone',
  },
  warning: {
    description: 'Pay attention to me, things are not going according to plan.',
    title: 'Heads up!',
  },
};

const iconMap = (key: string) => {
  const icons: { [key: string]: ReactElement } = {
    info: <Info fill={colors.N500} />,
    success: <CheckCircle fill={colors.G400} />,
    warning: <AlertTriangle fill={colors.Y300} />,
    error: <AlertCircle fill={colors.R300} />,
  };

  return key ? icons[key] : icons;
};

const getIcon = (key: string) => {
  return iconMap(key) as ReactElement;
};

export default () => (
  <div>
    {Object.keys(appearances).map((type, idx) => (
      <div
        key={type}
        style={idx ? ({ marginTop: gridSize() } as CSSProperties) : undefined}
      >
        <Flag
          actions={actions}
          appearance={type as AppearanceTypes}
          description={appearances[type].description}
          icon={getIcon(type)}
          id={type}
          isDismissAllowed
          key={type}
          title={appearances[type].title}
        />
      </div>
    ))}
  </div>
);
