import { colors } from '@uidu/theme';
import React, { Fragment, ReactElement } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'react-feather';
import Flag, { AppearanceTypes } from '../src';

type FlagType = {
  appearance: AppearanceTypes;
  description: string;
  title: string;
  icon: ReactElement;
};

const FlagActions = [
  {
    content: 'with onClick',
    onClick: () => {
      console.log('flag action clicked');
    },
  },
  {
    content: 'with href',
    href: 'https://uidu.org/',
    target: '_blank',
  },
];

const flagTypes: Array<FlagType> = [
  {
    appearance: 'error',
    description: 'You need to take action, something has gone terribly wrong!',
    title: 'error flag',
    icon: <AlertCircle color={colors.R300} />,
  },
  {
    appearance: 'info',
    description:
      "This alert needs your attention, but it's not super important.",
    title: 'info flag',
    icon: <Info color={colors.N500} />,
  },
  {
    appearance: 'success',
    description: 'Nothing to worry about, everything is going great!',
    title: 'success flag',
    icon: <CheckCircle color={colors.G400} />,
  },
  {
    appearance: 'warning',
    description: 'Pay attention to me, things are not going according to plan.',
    title: 'warning flag',
    icon: <AlertTriangle color={colors.Y300} />,
  },
  {
    appearance: 'normal',
    description: 'There is new update available',
    title: 'normal flag',
    icon: <CheckCircle color={colors.N0} />,
  },
];

export default () => (
  <Fragment>
    {flagTypes.map((flag: FlagType) => (
      <div key={flag.appearance} style={{ marginBottom: '10px' }}>
        <Flag
          appearance={flag.appearance}
          actions={FlagActions}
          description={flag.description}
          icon={flag.icon}
          id="1"
          isDismissAllowed
          key="1"
          title={flag.title}
        />
      </div>
    ))}
  </Fragment>
);
